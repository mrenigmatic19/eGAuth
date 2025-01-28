
const amqp = require('amqplib');

const EXCHANGE_KEY = 'key_exchange';
// const EXCHANGE_SERVICE = 'service_exchange';
// const EXCHANGE_SCAN = 'scan_exchange';

let keyChannel;
async function setupKeyChannel() {
    try {
      keyChannel = await connection.createChannel();
      await keyChannel.assertExchange(EXCHANGE_KEY, 'fanout', { durable: true });
  
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
  

  /*

  not needed

  // Setup service channel with retry logic
  async function setupServiceChannel() {
    try {
      serviceChannel = await connection.createChannel();
      await serviceChannel.assertExchange(EXCHANGE_SERVICE, 'fanout', { durable: true });
  
      serviceChannel.on('error', (err) => {
        console.error('Error in serviceChannel:', err.message);
        // Recreate channel if an error occurs
        setTimeout(setupServiceChannel, 5000);
      });
    } catch (err) {
      console.error('Error setting up serviceChannel:', err.message);
      setTimeout(setupServiceChannel, 5000); // Retry after 5 seconds
    }
  }
  
  // Setup scan channel with retry logic
  async function setupScanChannel() {
    try {
      scanChannel = await connection.createChannel();
      await scanChannel.assertExchange(EXCHANGE_SCAN, 'fanout', { durable: true });
  
      scanChannel.on('error', (err) => {
        console.error('Error in scanChannel:', err.message);
        // Recreate channel if an error occurs
        setTimeout(setupScanChannel, 5000);
      });
    } catch (err) {
      console.error('Error setting up scanChannel:', err.message);
      setTimeout(setupScanChannel, 5000); // Retry after 5 seconds
    }
  }
  */
  module.exports={setupKeyChannel,keyChannel}