const amqp = require('amqplib');
const RABBITMQ_URL = 'amqp://localhost';
let connection;
let keyChannel;
const EXCHANGE_KEY = 'key_exchange';

async function setupKeyChannel() {
  try {

      keyChannel = await connection.createChannel();
      await keyChannel.assertExchange(EXCHANGE_KEY, 'fanout', { durable: true });
      console.log(`Key channel setup complete for exchange: ${EXCHANGE_KEY}`);

      keyChannel.on('error', (err) => {
        console.error('Error in keyChannel:', err.message);
        keyChannel = null;
        setTimeout(setupKeyChannel, 5000); // Retry after 5 seconds
      });
    
  } catch (err) {
    console.error('Error setting up keyChannel:', err.message);
    setTimeout(setupKeyChannel, 5000); // Retry after 5 seconds
  }
}



async function setupConnection() {
  try {
      connection = await amqp.connect(RABBITMQ_URL);
      console.log('RabbitMQ connection established.');

      connection.on('error', (err) => {
        console.error('RabbitMQ connection error:', err.message);
        connection = null;
        setTimeout(setupConnection, 5000); 
      });

      connection.on('close', () => {
        console.error('RabbitMQ connection closed. Reconnecting...');
        connection = null;
        setTimeout(setupConnection, 5000);
      });
   
      await setupKeyChannel();
  } catch (err) {
    console.error('Error setting up RabbitMQ connection:', err.message);
    setTimeout(setupConnection, 5000); 
  }
}



module.exports = { setupConnection, getKeyChannel:()=>keyChannel,EXCHANGE_KEY };
