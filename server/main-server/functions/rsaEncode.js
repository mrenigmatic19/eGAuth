const crypto = require('crypto');

const RSAPUBLIC = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5OisMHBHTc7AKhagQeFl
awZz2hfS9/6VjDn0dNCxJNyqsfkEAghHy9Pou875yFyO9Odyia9/hiR7TrlBv/5V
NRhLAmMizdT1+9mXsZ3tWy0gHhNuDQlHfhMGzCjT5ljYzyFbIOKcskSS5YtjjoH9
K7vnBbYt6u9gNcs3ngLlf8sYV3kFeLImdmiPFRx+hDbFWRCq0uQS1t08r66qtOgL
o2+MdwVIIeh+R0LuutlZwdESZ7FYZhaoLqmPDwdje3mrLP1uLTCR74yYxh89qS0P
S2xlqIJxfvH0GkMUXDG0iLdmAls8SHeX+m4x3rVf33b4lmM9ozRIYKymsy36VF/v
kQIDAQAB
-----END PUBLIC KEY-----`

const encryptWithRSA = (plaintext) => {
    try {
        const encrypted = crypto.publicEncrypt(
            {
                key: RSAPUBLIC,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, // Using OAEP padding
            }, 
            Buffer.from(plaintext, 'utf-8') 
        );

        return encrypted.toString('base64'); // Convert to Base64 for safe transmission
    } catch (err) {
        console.error('Error encrypting data:', err.message);
        throw new Error('Encryption failed');
    }

};




module.exports = { encryptWithRSA };
