const amqp = require('amqplib');
const RABBITMQ_URL = 'amqp://localhost';

let connection;

async function setupRabbitMQConnection() {
  try {
    connection = await amqp.connect(RABBITMQ_URL);
    console.log('RabbitMQ connection established');
    
    // Error handling for connection
    connection.on('error', (err) => {
      console.error('RabbitMQ connection error:', err.message);
      setTimeout(setupRabbitMQConnection, 5000); // Retry after 5 seconds
    });

    connection.on('close', () => {
      console.error('RabbitMQ connection closed. Reconnecting...');
      setTimeout(setupRabbitMQConnection, 5000); // Retry after 5 seconds
    });

  } catch (err) {
    console.error('Error setting up RabbitMQ connection:', err.message);
    setTimeout(setupRabbitMQConnection, 5000); // Retry after 5 seconds
  }
}

module.exports = {
  setupRabbitMQConnection,
  getConnection: () => connection
};
