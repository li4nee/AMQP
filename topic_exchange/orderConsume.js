import * as amqp from "amqplib"

export async function consumeOrderNotification() {
    try {
        const connection = await amqp.connect("amqp://localhost")
        const channel = await connection.createChannel()
        const exchange = "notification_exchange"
        const queue = "order_queue"
    
        await channel.assertExchange(exchange,"topic",{durable:false})
        await channel.assertQueue(queue,{durable:false})
        await channel.bindQueue(queue,exchange,"order.#")
        channel.consume(queue,(message)=>{
            if(message.content!==null)
            {
                console.log(JSON.parse(message.content))
            }
            channel.ack(message)
        },{noAck:false})
    } catch (error) {
        console.log(error)
    }
    
}
consumeOrderNotification()