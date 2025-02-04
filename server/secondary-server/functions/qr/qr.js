const QRCode = require('qrcode');
// const jsQR = require('jsqr');
// const { createCanvas, loadImage } = require('canvas');
// const { set } = require('mongoose');

async function generateQR(encryptedText) {
    try {
        const qrCodeDataURL = await QRCode.toDataURL(encryptedText);
        return qrCodeDataURL;
    } catch (err) {
        console.error('Error generating QR code:', err);
        throw err;
    }
}

generateQR('Hello World').then((data) => {
    console.log(data);
}).catch((err) => {
    console.error(err);
});
module.exports = {generateQR};