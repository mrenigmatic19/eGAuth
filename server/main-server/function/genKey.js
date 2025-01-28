const crypto = require('crypto');
const { getKeyChannel, EXCHANGE_KEY } = require('./rabbitMQ');


function generateAES256Key() {
  return crypto.randomBytes(32).toString('hex'); 
}


function generateIV() {
  return crypto.randomBytes(16).toString('hex');
}


async function generateAndPublishKey() {
  const key = generateAES256Key();
  const iv = generateIV();

  const channel = getKeyChannel();
  if (!channel) {
    console.error('RabbitMQ channel is not initialized.');
    return;
  }

  const payload = JSON.stringify({ key, iv, timestamp: new Date().toISOString() });
  channel.publish(EXCHANGE_KEY, '', Buffer.from(payload));
  console.log('Published Key and IV:', payload);
}


const setupKeyChannel=async () => {
  try {
    generateAndPublishKey(); 
    setInterval(generateAndPublishKey, 5 * 60 * 1000); 
  } catch (err) {
    console.error('Error during setup:', err.message);
    process.exit(1);
  }
};

module.exports={setupKeyChannel}
