/**
 * Vanguard Aggregates & Minerals - Server & API Backend
 * Lightweight, zero-dependency Node.js HTTP server and quotation API backend.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;
const DATA_DIR = path.join(__dirname, 'data');
const QUOTES_FILE = path.join(DATA_DIR, 'quotes.json');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(QUOTES_FILE)) {
  fs.writeFileSync(QUOTES_FILE, '[]', 'utf8');
}
if (!fs.existsSync(CONTACTS_FILE)) {
  fs.writeFileSync(CONTACTS_FILE, '[]', 'utf8');
}

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

// Helper: parse request body
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 1e6) { // 1MB limit
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      const contentType = req.headers['content-type'] || '';
      if (contentType.includes('application/json')) {
        try {
          resolve(JSON.parse(body || '{}'));
        } catch (e) {
          reject(new Error('Invalid JSON format'));
        }
      } else if (contentType.includes('application/x-www-form-urlencoded')) {
        const params = new URLSearchParams(body);
        const obj = {};
        for (const [key, value] of params.entries()) {
          obj[key] = value;
        }
        resolve(obj);
      } else {
        try {
          resolve(JSON.parse(body || '{}'));
        } catch (e) {
          resolve({ raw: body });
        }
      }
    });
    req.on('error', err => reject(err));
  });
}

const server = http.createServer(async (req, res) => {
  // CORS Headers for API calls
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = req.url.split('?')[0];

  // =========================================================================
  // API ENDPOINT: POST /api/quote
  // =========================================================================
  if (req.method === 'POST' && (parsedUrl === '/api/quote' || parsedUrl === '/api/quotes')) {
    try {
      const payload = await parseBody(req);

      // Validate required fields
      // Required: Full Name, Phone Number, Email Address, Material Type / Required, Quantity Required, Delivery Location, Preferred / Required Delivery Date
      const fullName = (payload.fullName || payload.customerName || '').trim();
      const companyName = (payload.companyName || '').trim();
      const phone = (payload.phone || payload.phoneNumber || '').trim();
      const email = (payload.email || payload.emailAddress || '').trim();
      const materialType = (payload.materialType || payload.materialRequired || payload.material || '').trim();
      const requiredQuantity = (payload.requiredQuantity || payload.quantityRequired || payload.quantity || '').toString().trim();
      const deliveryLocation = (payload.deliveryLocation || payload.deliveryAddress || payload.postcode || '').trim();
      const preferredDeliveryDate = (payload.preferredDeliveryDate || payload.requiredDeliveryDate || payload.deliveryDate || payload.requiredDate || '').trim();
      const additionalRequirements = (payload.additionalRequirements || payload.additionalNotes || payload.notes || '').trim();

      const missing = [];
      if (!fullName) missing.push('Full Name');
      if (!phone) missing.push('Phone Number');
      if (!email) missing.push('Email Address');
      if (!materialType) missing.push('Material Type');
      if (!requiredQuantity || parseFloat(requiredQuantity) <= 0) missing.push('Required Quantity (positive number)');
      if (!deliveryLocation) missing.push('Delivery Location');
      if (!preferredDeliveryDate) missing.push('Preferred Delivery Date');

      // Email format check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && !emailRegex.test(email)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: false,
          error: 'Please provide a valid email address format (e.g. name@domain.com).'
        }));
        return;
      }

      // Phone check (at least 7 digits)
      const digitsOnly = phone.replace(/\D/g, '');
      if (phone && digitsOnly.length < 7) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: false,
          error: 'Please provide a valid telephone number with area/country code.'
        }));
        return;
      }

      if (missing.length > 0) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: false,
          error: `Missing required quotation fields: ${missing.join(', ')}`,
          missingFields: missing
        }));
        return;
      }

      // Generate Reference Code
      const refCode = 'VNG-QTE-' + Math.floor(10000 + Math.random() * 90000);
      const quoteRecord = {
        refCode,
        timestamp: new Date().toISOString(),
        fullName,
        companyName: companyName || 'Not Specified',
        phone,
        email,
        materialType,
        materialRequired: materialType,
        requiredQuantity,
        quantityRequired: requiredQuantity,
        unit: payload.unit || 'Tonnes (Bulk Loose)',
        deliveryLocation,
        preferredDeliveryDate,
        requiredDeliveryDate: preferredDeliveryDate,
        additionalRequirements: additionalRequirements || 'None',
        vehicleMethod: payload.deliveryMethod || payload.vehicle || '8-Wheel Rigid Tipper (20t)',
        timeSlot: payload.timeSlot || 'Morning (08:00 - 12:00)',
        status: 'Active - Central Weighbridge Reviewing'
      };

      // Persist quote to JSON file
      let existingQuotes = [];
      try {
        const fileData = fs.readFileSync(QUOTES_FILE, 'utf8');
        existingQuotes = JSON.parse(fileData || '[]');
      } catch (e) {
        existingQuotes = [];
      }
      existingQuotes.unshift(quoteRecord);
      fs.writeFileSync(QUOTES_FILE, JSON.stringify(existingQuotes, null, 2), 'utf8');

      console.log(`[QUOTATION RECEIVED] ${refCode} from ${fullName} for ${requiredQuantity} of ${materialType} to ${deliveryLocation}`);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        referenceCode: refCode,
        timestamp: quoteRecord.timestamp,
        message: 'Your quotation request has been officially recorded by Vanguard Minerals Central Dispatch.',
        details: {
          refCode,
          fullName,
          companyName: quoteRecord.companyName,
          email,
          phone,
          materialType,
          materialRequired: materialType,
          requiredQuantity: `${requiredQuantity} ${quoteRecord.unit}`,
          quantityRequired: `${requiredQuantity} ${quoteRecord.unit}`,
          deliveryLocation,
          preferredDeliveryDate,
          requiredDeliveryDate: preferredDeliveryDate,
          additionalRequirements: quoteRecord.additionalRequirements,
          sla: '30-Minute Callback Guaranteed'
        }
      }));
      return;
    } catch (err) {
      console.error('[API ERROR] Failed to process quotation:', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: false,
        error: 'Internal server error while processing quotation. Please contact dispatch at (0800) 848-2626.'
      }));
      return;
    }
  }

  // =========================================================================
  // API ENDPOINT: POST /api/contact
  // =========================================================================
  if (req.method === 'POST' && parsedUrl === '/api/contact') {
    try {
      const payload = await parseBody(req);
      const name = (payload.name || payload.fullName || '').trim();
      const email = (payload.email || '').trim();
      const phone = (payload.phone || '').trim();
      const message = (payload.message || payload.comments || '').trim();

      if (!name || !email || !message) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: false,
          error: 'Please fill in Name, Email, and Message.'
        }));
        return;
      }

      const contactId = 'VNG-MSG-' + Math.floor(10000 + Math.random() * 90000);
      const contactRecord = {
        id: contactId,
        timestamp: new Date().toISOString(),
        name,
        email,
        phone,
        message
      };

      let existing = [];
      try {
        existing = JSON.parse(fs.readFileSync(CONTACTS_FILE, 'utf8') || '[]');
      } catch (e) { existing = []; }
      existing.unshift(contactRecord);
      fs.writeFileSync(CONTACTS_FILE, JSON.stringify(existing, null, 2), 'utf8');

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        id: contactId,
        message: 'Your message has been received. Our quarry office will respond promptly.'
      }));
      return;
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: err.message }));
      return;
    }
  }

  // =========================================================================
  // API ENDPOINT: GET /api/quotes (Review saved quotes)
  // =========================================================================
  if (req.method === 'GET' && parsedUrl === '/api/quotes') {
    try {
      const data = fs.readFileSync(QUOTES_FILE, 'utf8');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
      return;
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
      return;
    }
  }

  // =========================================================================
  // STATIC FILE SERVING
  // =========================================================================
  let requestPath = parsedUrl;
  if (requestPath === '/' || requestPath === '') {
    requestPath = '/index.html';
  }

  // Prevent path traversal
  const safePath = path.normalize(requestPath).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(PUBLIC_DIR, safePath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(`
          <!DOCTYPE html>
          <html>
            <head><title>404 Not Found | Vanguard Aggregates</title></head>
            <body style="background:#0c0e11; color:#fff; font-family:sans-serif; text-align:center; padding:50px;">
              <h1 style="color:#c5a059;">404 - Specification Not Found</h1>
              <p>The requested file <code>${parsedUrl}</code> does not exist.</p>
              <a href="/index.html" style="color:#c5a059; text-decoration:none; font-weight:bold;">&larr; Return to Home Page</a>
            </body>
          </html>
        `);
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache'
      });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` Vanguard Aggregates & Minerals Web Server Running!`);
  console.log(` Local URL: http://localhost:${PORT}`);
  console.log(` Home Page:      http://localhost:${PORT}/index.html`);
  console.log(` Products Page:  http://localhost:${PORT}/products.html`);
  console.log(` Delivery Page:  http://localhost:${PORT}/delivery.html`);
  console.log(` Contact Page:   http://localhost:${PORT}/contact.html`);
  console.log(` Quotation API:  POST http://localhost:${PORT}/api/quote`);
  console.log(`=======================================================`);
});
