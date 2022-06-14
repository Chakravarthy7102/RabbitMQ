const amqp = require("amqplib");
const data = { name: "Akira Sama", age: 7 };
connect();
async function connect() {
  try {
    const queue = "Jobs";
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    await channel.assertQueue(queue);
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
    console.log(data);
    console.log("Message queue was created!");
  } catch (err) {
    console.log("error", err);
  }
}
