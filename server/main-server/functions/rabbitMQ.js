const amqp = require('amqplib');
const RABBITMQ_URL = 'amqp://localhost';
const {setupKeyChannel,keyChannel,EXCHANGE_KEY}=require('./channels')

let connection;

async function setupRabbitMQ() {
  try {
    connection = await amqp.connect(RABBITMQ_URL);

    connection.on('error', (err) => {
      console.error('RabbitMQ connection error:', err.message);
      
      setTimeout(setupRabbitMQ, 5000); 
    });

    connection.on('close', () => {
      console.error('RabbitMQ connection closed. Reconnecting...');
      setTimeout(setupRabbitMQ, 5000);
    });

    await setupKeyChannel();
    // await setupServiceChannel();
    // await setupScanChannel();
  } catch (err) {
    console.error('Error setting up RabbitMQ:', err.message);
    setTimeout(setupRabbitMQ, 5000); 
  }
}

module.exports = {
  setupRabbitMQ,
  getKeyChannel: () => keyChannel,
//   getServiceChannel: () => serviceChannel,
//   getScanChannel: () => scanChannel,
  EXCHANGE_KEY,
//   EXCHANGE_SERVICE,
//   EXCHANGE_SCAN,
};
