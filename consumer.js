const amqp = require("amqplib");

const queue = "Jobs";
connect();
async function connect() {
  const connection = await amqp.connect("amqp://localhost:5672");
  const channel = await connection.createChannel();
  await channel.assertQueue(queue);
  channel.consume(queue, (message) => {
    const data = JSON.parse(message.content.toString());
    console.log(data);
    console.log(`Recived the data form the publisher ${data.name}`);
    channel.ack(message);
  });
}
