const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// Get the server URL from environment variables or use default
const serverUrl = process.env.SERVER_URL || 'http://localhost:3000';

// Configure QR code options
const qrOptions = {
    errorCorrectionLevel: 'H',
    type: 'png',
    quality: 0.92,
    margin: 1,
    color: {
        dark: '#000000',
        light: '#FFFFFF'
    }
};

// Generate QR code
async function generateQRCode() {
    try {
        // Create public/qr directory if it doesn't exist
        const qrDir = path.join(__dirname, 'public', 'qr');
        if (!fs.existsSync(qrDir)) {
            fs.mkdirSync(qrDir, { recursive: true });
        }

        // Generate QR code
        const qrPath = path.join(qrDir, 'qrcierge.png');
        await QRCode.toFile(qrPath, serverUrl, qrOptions);
        
        console.log(`QR code generated successfully at ${qrPath}`);
        console.log(`QR code points to: ${serverUrl}`);
    } catch (error) {
        console.error('Error generating QR code:', error);
    }
}

// Run the generator
generateQRCode();