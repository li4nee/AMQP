import * as amqplib from 'amqplib'
export async function receiveMail()
{
    try{
        const connection = await amqplib.connect("amqp://localhost")
        const channel = await connection.createChannel()
        const mail_queue="mail_queue"
        await channel.assertQueue(mail_queue,{durable:false})
        await channel.consume(mail_queue,(message)=>{
            if(message!=null)
            {
                console.log(JSON.parse(message.content))
                channel.ack(message)
            }
        })

    }catch(err)
    {
        console.log(err)
    }
}
receiveMail()