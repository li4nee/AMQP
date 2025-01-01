import * as amqplib from 'amqplib'

async function sendMail()
{
    try {
        const connection = await amqplib.connect('amqp://localhost') // connection established with the RabbitMQ server
        const channel = await connection.createChannel(); 
        const exchange = "mail_exchange";
        const routingKey = "send_mail";
        const queue = "mail_queue"
        // data 
        const message ={
            to:"nishantpokharel9@gmail.com",
            from:"nirajisbaba@gmail.com",
            subject:"SUPP MY G",
            body:"randy orton"
        }

        await channel.assertExchange(exchange,"direct",{durable:false})
        await channel.assertQueue(queue,{durable:false})
        await channel.bindQueue(queue,exchange,routingKey)

        channel.publish(exchange,routingKey,Buffer.from(JSON.stringify(message)))
        console.log("mesage was sent",message)

        setTimeout(()=>{
            connection.close()
        },500)

    } catch (error) {
        console.log(error)
    }
}

sendMail()