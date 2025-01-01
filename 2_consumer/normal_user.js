import * as amqp from "amqplib";

export async function consume_mail() {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    const queue = "user_mail_queue";

    await channel.assertQueue(queue, { durable: false });

    await channel.consume(queue, (mesage) => {
        if(mesage!==null)
        {
            console.log(JSON.parse(mesage.content));
            channel.ack(mesage);
        }
    });
  } catch (error) {
    console.log(error)
  }
}
consume_mail()
