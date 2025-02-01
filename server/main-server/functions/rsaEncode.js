const crypto = require('crypto');

// Function to encrypt the plaintext using RSA public key
const encryptWithRSA = (plaintext, rsakey) => {
    try {
        // Ensure the key is in the correct PEM format
        const publicKey = rsakey;

        // Encrypt the plaintext using the public key
        const encrypted = crypto.publicEncrypt(
            {
                key: publicKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, // Using OAEP padding
            },
            Buffer.from(plaintext)
        );

        // Return the encrypted value (ciphertext) in base64 encoding
        return encrypted.toString('base64');
    } catch (err) {
        console.error('Error encrypting data:', err);
        throw new Error('Encryption failed');
    } 
};

module.exports = { encryptWithRSA };
