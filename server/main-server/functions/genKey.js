const crypto = require('crypto');
const { setupRabbitMQ, getKeyChannel, EXCHANGE_KEY } = require('./rabbitMQ');
const { encryptWithRSA } = require('./rsaEncode');

const rsakey = process.env.RSAPUBLIC;

if (!rsakey) {
  console.error('RSA Public Key not found in environment variables.');
  process.exit(1);
}

// Function to generate AES-256 Key
function generateAES256Key() {
  const key = crypto.randomBytes(32).toString('hex'); // 32 bytes (256 bits)
  console.log('Generated AES-256 Key:', key);
  return key;
}

// Function to generate IV (Initialization Vector)
function generateIV() {
  const iv = crypto.randomBytes(16).toString('hex'); // 16 bytes (128 bits)
  console.log('Generated IV:', iv);
  return iv;
}


async function generateAndPublishKey() {
  try {
    const key = encryptWithRSA(generateAES256Key());
    const iv = encryptWithRSA(generateIV());

    const channel = getKeyChannel();
    if (!channel) {
      console.error('RabbitMQ channel is not initialized.');
      return;
    }

    const payload = JSON.stringify({ key, iv, timestamp: new Date().toISOString() });
    channel.publish(EXCHANGE_KEY, '', Buffer.from(payload, 'utf-8')); // Ensure utf-8 encoding
    console.log('Published Key and IV:', payload);
  } catch (error) {
    console.error('Error publishing key:', error.message);
  }
}

const setupKeyChannel = async () => {
  try {
    await generateAndPublishKey(); // First execution
    setInterval(async () => {
      await generateAndPublishKey(); // Repeat every 5 minutes
    }, 5 * 60 * 1000);
  } catch (err) {
    console.error('Error during setup:', err.message);
    process.exit(1);
  } 
};

module.exports = { setupRabbitMQ, setupKeyChannel };
