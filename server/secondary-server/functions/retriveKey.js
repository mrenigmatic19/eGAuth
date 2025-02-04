const { setupConnection, getKeyChannel, EXCHANGE_KEY } = require('./rabbitMQ');
const { decryptWithRSA } = require('./rsaDecode');

let key = null;
let iv = null; // Also store IV globally if needed

async function setupConsumer() {
  try {
    const keyChannel = getKeyChannel();
    if (!keyChannel) {
      console.error("RabbitMQ channel not initialized.");
      return;
    }

    const { queue } = await keyChannel.assertQueue('', { exclusive: true });

    // Bind the queue to the exchange
    await keyChannel.bindQueue(queue, EXCHANGE_KEY, '');
    console.log(`Consumer bound to exchange: ${EXCHANGE_KEY}`);

    // Consume messages as they arrive
    keyChannel.consume(
      queue,
      (msg) => {
        if (msg) {
          try {
            let messageContent = JSON.parse(msg.content.toString('utf-8')); // Convert buffer to string before parsing JSON
            console.log('Received message:', messageContent);
            console.log("   Key:", messageContent.key, "    IV:", messageContent.iv);

            // Check if RSA keys are present
            if (!process.env.RSAPRIVATE) {
              console.error("RSA Private Key not found in environment variables.");
              return;
            }

            // Decrypt AES key and IV
            key = decryptWithRSA(messageContent.key);
            iv = decryptWithRSA(messageContent.iv);

            console.log("Decrypted Key:", key, "Decrypted IV:", iv);

            // Acknowledge the message
            keyChannel.ack(msg);
          } catch (error) {
            console.error("Error processing message:", error.message);
          }
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

module.exports = { setupConnection, setupConsumer, key, iv };
