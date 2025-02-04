const crypto = require('crypto');


RSAPRIVATE = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDk6KwwcEdNzsAq
FqBB4WVrBnPaF9L3/pWMOfR00LEk3Kqx+QQCCEfL0+i7zvnIXI7053KJr3+GJHtO
uUG//lU1GEsCYyLN1PX72Zexne1bLSAeE24NCUd+EwbMKNPmWNjPIVsg4pyyRJLl
i2OOgf0ru+cFti3q72A1yzeeAuV/yxhXeQV4siZ2aI8VHH6ENsVZEKrS5BLW3Tyv
rqq06Aujb4x3BUgh6H5HQu662VnB0RJnsVhmFqguqY8PB2N7eass/W4tMJHvjJjG
Hz2pLQ9LbGWognF+8fQaQxRcMbSIt2YCWzxId5f6bjHetV/fdviWYz2jNEhgrKaz
LfpUX++RAgMBAAECggEADWYBDiTER62eWdhRMQn8YbNS/KUAWDuyjS6nPF8qvzmb
VCd7MJNDgI66xKNsw2mHhJY3gg+fqz5faVA2pQJCAoWVfmJHGz0n2MH3uxG/XuLZ
Smlgu6qbYKnEcBbDsGvq5NTS/K3G9jhFUOJDxYeeRf0NnKv5LBMu0nc+niUVQdGJ
F0HCjv00l+nRDbg+cPUgspAzgzOMPjR5o7AA2zJhuhjrZLOmXkN1vHqxAfiHj/KI
yCIZTRcwrbRwc5TgDyif6qqkTkALg9KbWpUz6Kev+8sSpYGuvEFmcK/N0ek+gtUs
NzVHpRaVxJfweanV9H8STvrB7NU4I1mgFcpSjBjUQQKBgQD2mhFt5OwZFk4k3n8J
30ILRkd3fEt1UsgeqH5ZPqfJ+6TaoNwSISwJsyiXULiYfM2tcOHocegQLAE+Kqi+
hrmR3GzPxSc5+1z6sWg8hy48fDzWZtrN7602F3gAa1JrCSY4Bcyv/0ohspOFLmD4
MsMDUigfzfr9W3gu2EVAy8+xDQKBgQDtofxtFUHxRYPLJS1T/zZI6NDNrBTIHDFs
f7z2OF7kugjLFo76nQs0P7hGBNpyONxfLiR/OUm0Py3pUO172CRDzmRf4b1p2RU+
s8ba1fFvAbOIz6XBD6ju/U37ACaIffyOD61SvBT6vXZ/vDAgPqc5d64b/dtDggR0
sNaMys6vlQKBgAVel3CQIn/tV2hAG/4ICXUbY6T7ZN06HzdjrdSdo6OnQhCsnf4b
EM1pREH/NPXFCelz4sdf65CmlKRY43G6l0HQzeG8Rj1h9sVSpZVj0CLrBZwZgzwm
stvRqQBBVfsUqOthXPKcGW4gaEvnFZ9x44Mn/82pe4SWwEgs110w0uXlAoGAOUZ1
xQT+o9yRa4FGb5xvxRr4WNpFGAZTk0cmkGH93TtJq0mApL79WFaTX60DycwSsY45
lcCFF0CzHC05UEREWWOBpeqO8Ng12qsSHuS6EHtkfnEuDl5r5U6AYSMkJnnXSZZV
vD9A/z5zNU5yexMe0ycZe/2vv5Gy6T1GOSEYuBECgYEA0aPvH6sSD3deToEGoxg8
BlsLS4tORmlTC4IRPqR1BwC9u3hvBQuHQBokQwJHh8pOZn5Vb9hMmgVSRLeaDAUh
A7BdAXKHd7HHE46jzE2L9WbLZMOq9/Wxxel8/wEv8/5EkmZ7MYBFC4wwJUVm1pOf
LVKtyLmELdo7e5Z50Bh1T4k=
-----END PRIVATE KEY-----`;
const decryptWithRSA = (ciphertext) => {
    try {
        const encryptedBuffer = Buffer.from(ciphertext, 'base64'); // Ensure it's Base64 decoded
        
        const decrypted = crypto.privateDecrypt(
            {
                key: RSAPRIVATE,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            },
            encryptedBuffer
        );

        return decrypted.toString('utf-8'); 
    } catch (err) {
        console.error('Error decrypting data:', err.message);
        throw new Error('Decryption failed');
    }
}; 


module.exports = { decryptWithRSA };
