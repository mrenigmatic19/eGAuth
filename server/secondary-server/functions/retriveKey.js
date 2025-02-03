const { setupConnection, getKeyChannel, EXCHANGE_KEY  } = require('./rabbitMQ');

async function setupConsumer() {
  try {
    const keyChannel = getKeyChannel();

    const { queue } = await keyChannel.assertQueue('', { exclusive: true });

    // Bind the queue to the exchange
    await keyChannel.bindQueue(queue, EXCHANGE_KEY, '');
    console.log(`Consumer bound to exchange: ${EXCHANGE_KEY}`);

    // Consume messages as they arrive
    keyChannel.consume(
      queue,
      (msg) => {
        if (msg) {
          const messageContent = msg.content.toString();
          console.log('Received message:', messageContent);

          // Acknowledge the message
          keyChannel.ack(msg);
        }
      },
      { noAck: false } // Require manual acknowledgment
    );

    console.log('Consumer is waiting for messages...');
  } catch (err) {
    console.error('Error setting up consumer:', err.message);
    setTimeout(setupConsumer, 5000); // Retry after 5 seconds
  }
}

module.exports={setupConnection,setupConsumer}