import * as amqp from "amqplib"

export async function send_notification(routingKey,message)
{
    const connection = await amqp.connect("amqp://localhost")
    const channel = await connection.createChannel()
    const exchange = "notification_exchange";

    await channel.assertExchange(exchange,"topic",{durable:false})
    channel.publish(exchange,routingKey,Buffer.from(JSON.stringify(message)))

    console.log("Message sent normal",message)
    setTimeout(()=>{
        connection.close()
    },500) 
}

send_notification("order.placed",{order:12345,status:"placed"})
send_notification("payment.pending",{paymentId:"21kjsd",status:"pending"})