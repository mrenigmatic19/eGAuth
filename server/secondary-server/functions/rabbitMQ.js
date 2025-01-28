const amqp = require('amqplib');
const RABBITMQ_URL = 'amqp://localhost';
const {setupKeyChannel,keyChannel,EXCHANGE_KEY}=require('./channels');
let connection;

async function setupConnection() {
  try {
      connection = await amqp.connect(RABBITMQ_URL);
      console.log('RabbitMQ connection established.');

      connection.on('error', (err) => {
        console.error('RabbitMQ connection error:', err.message);
        connection = null;
        setTimeout(setupConnection, 5000); // Retry connection after 5 seconds
      });

      connection.on('close', () => {
        console.error('RabbitMQ connection closed. Reconnecting...');
        connection = null;
        setTimeout(setupConnection, 5000);
      });
   
      await setupKeyChannel();
  } catch (err) {
    console.error('Error setting up RabbitMQ connection:', err.message);
    setTimeout(setupConnection, 5000); // Retry after 5 seconds
  }
}



module.exports = { setupConnection, getKeyChannel:()=>keyChannel,EXCHANGE_KEY };
