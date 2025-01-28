const { getConnection } = require('./connection');
const EXCHANGE_KEY = 'key_exchange';

let keyChannel;

async function setupKeyChannel() {
  try {
    const connection = getConnection();
    if (!connection) {
      console.error('No RabbitMQ connection available');
      return;
    }

    keyChannel = await connection.createChannel();
    console.log('RabbitMQ channel created for key exchange');

    // Ensure the exchange exists
    await keyChannel.assertExchange(EXCHANGE_KEY, 'fanout', { durable: true });

    // Error handling for channel
    keyChannel.on('error', (err) => {
      console.error('Error in keyChannel:', err.message);
      // Recreate channel if an error occurs
      setTimeout(setupKeyChannel, 5000);
    });

  } catch (err) {
    console.error('Error setting up keyChannel:', err.message);
    setTimeout(setupKeyChannel, 5000); // Retry after 5 seconds
  }
}

module.exports = {
  setupKeyChannel,
  getKeyChannel: () => keyChannel,
  EXCHANGE_KEY
};
