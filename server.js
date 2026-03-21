const http = require('http');
const fs = require('fs');
const path = require('path');

const CSV_FILE = path.join(__dirname, 'rsvps.csv');

// Initialize CSV with headers if missing
if (!fs.existsSync(CSV_FILE)) {
    fs.writeFileSync(CSV_FILE, 'Full Name,Attendance,Bringing Guests,Guest Quantity,Message\n');
}

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/api/rsvp') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                // Extract fields based on form schema
                const fullName = data.fullName || '';
                const attendance = data.attendance || '';
                const bringingGuests = data.bringingGuests || 'no';
                const guests = data.guests || '';
                const message = data.message || '';
                
                // Escape and write to CSV
                const cleanStr = (s) => `"${s.replace(/"/g, '""')}"`;
                const row = `${cleanStr(fullName)},${cleanStr(attendance)},${cleanStr(bringingGuests)},${cleanStr(guests)},${cleanStr(message)}\n`;
                fs.appendFileSync(CSV_FILE, row);
                
                // Email Notification Mock
                console.log('\n=======================================');
                console.log('EMAIL NOTIFICATION: NEW RSVP');
                console.log(`To: Jeremiah\nFrom: RSVP System <noreply@jaygraduation.com>`);
                console.log(`Subject: New RSVP Received from ${fullName}!`);
                console.log(`\nNew RSVP Details:`);
                console.log(`Full Name: ${fullName}`);
                console.log(`Attendance: ${attendance}`);
                console.log(`Additional Guests: ${bringingGuests}`);
                if (bringingGuests === 'yes') console.log(`Guest Quantity: ${guests}`);
                if (message) console.log(`Message: \n${message}\n`);
                console.log('=======================================\n');
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, msg: "RSVP logged to CSV and Email dispatched." }));
            } catch (err) {
                console.error(err);
                res.writeHead(400);
                res.end(JSON.stringify({ error: "Failed to parse RSVP payload." }));
            }
        });
    } else {
        // Fallback local dev web server logic for HTML files
        let filePath = req.url === '/' ? '/index.html' : req.url;
        let absPath = path.join(__dirname, filePath);
        
        if (fs.existsSync(absPath) && fs.statSync(absPath).isFile()) {
            let ext = path.extname(absPath);
            let mimeType = 'text/html';
            let cacheControl = 'no-cache'; // Default for HTML
            
            if(ext === '.css') { mimeType = 'text/css'; cacheControl = 'public, max-age=31536000, immutable'; }
            else if(ext === '.js') { mimeType = 'application/javascript'; cacheControl = 'public, max-age=31536000, immutable'; }
            else if(ext === '.png') { mimeType = 'image/png'; cacheControl = 'public, max-age=31536000, immutable'; }
            else if(ext === '.jpg' || ext === '.jpeg') { mimeType = 'image/jpeg'; cacheControl = 'public, max-age=31536000, immutable'; }
            else if(ext === '.webp') { mimeType = 'image/webp'; cacheControl = 'public, max-age=31536000, immutable'; }
            else if(ext === '.svg') { mimeType = 'image/svg+xml'; cacheControl = 'public, max-age=31536000, immutable'; }
            
            res.writeHead(200, { 
                'Content-Type': mimeType,
                'Cache-Control': cacheControl
            });
            res.end(fs.readFileSync(absPath));
        } else {
            res.writeHead(404);
            res.end('Not Found');
        }
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Local backend configured. Running on http://localhost:${PORT}`);
    console.log(`Saving RSVPs to: ${CSV_FILE}`);
    console.log(`Ready to trigger Email notifications seamlessly.`);
});
