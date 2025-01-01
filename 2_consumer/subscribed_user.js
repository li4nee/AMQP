import * as amqp from "amqplib";

export async function consume_mail_subscribed() {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    // const exchange = "mail_exchange2";
    const queue = "subscribed_user_mail_queue";
    // const routing_key = "send_mail_to_subscribed_user";

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
consume_mail_subscribed()
