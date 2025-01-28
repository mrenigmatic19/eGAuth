const { getKeyChannel, EXCHANGE_KEY } = require('./channel');

// Function to consume messages from the exchange
async function consumeKeyAndIV() {
  const channel = getKeyChannel();
  if (!channel) {
    console.error('RabbitMQ channel is not initialized.');
    return;
  }

  // Create a queue (anonymous) to bind to the exchange
  const { queue } = await channel.assertQueue('', { exclusive: true });
  console.log(`Queue created: ${queue}`);

  // Bind the queue to the exchange to receive messages
  await channel.bindQueue(queue, EXCHANGE_KEY, '');

  console.log('Waiting for messages in the queue...');

  // Consume messages from the queue
  channel.consume(queue, (msg) => {
    if (msg) {
      const payload = JSON.parse(msg.content.toString());
      console.log('Received Key and IV:', payload);
      
      // Acknowledge the message
      channel.ack(msg);
    }
  }, { noAck: false });
}

async function setupConsumer() {
  try {
    await consumeKeyAndIV();
  } catch (err) {
    console.error('Error during consumer setup:', err.message);
    process.exit(1);
  }
}

setupConsumer();
