import * as amqp from "amqplib"

export async function send_mail_to_subscribed_user()
{
    const connection = await amqp.connect("amqp://localhost")
    const channel = await connection.createChannel()

    const exchange = "mail_exchange2";
    const queue = "subscribed_user_mail_queue";
    const routing_key = "send_mail_to_subscribed_user";

    await channel.assertExchange(exchange,"direct",{durable:false})
    await channel.assertQueue(queue,{durable:false})
    await channel.bindQueue(queue,exchange,routing_key)

    const message ={
        to:"nishantpokharel9@gmail.com",
        from:"nirajisbaba@gmail.com",
        subject:"SUPP MY G",
        body:"randy orton"
    }

    // channel.publish(exchange,routing_key,Buffer.from(message))
    channel.publish(exchange,routing_key,Buffer.from(JSON.stringify(message)))

    console.log("Message sent",message)
    setTimeout(()=>{
        connection.close()
    },500) 
}

export async function send_mail_to_user()
{
    const connection = await amqp.connect("amqp://localhost")
    const channel = await connection.createChannel()

    const exchange = "mail_exchange2";
    const queue = "user_mail_queue";
    const routing_key = "send_mail_to_user";

    await channel.assertExchange(exchange,"direct",{durable:false})
    await channel.assertQueue(queue,{durable:false})
    await channel.bindQueue(queue,exchange,routing_key)

    const message ={
        to:"nishantpokharel9@gmail.com",
        from:"nirajisbaba@gmail.com",
        subject:"SUPP MY G",
        body:"randy orton jsnjskjas"
    }

    channel.publish(exchange,routing_key,Buffer.from(JSON.stringify(message)))

    console.log("Message sent")
    setTimeout(()=>{
        connection.close()
    },500) 
}
export async function send_mail_to_both_user()
{
    const connection = await amqp.connect("amqp://localhost")
    const channel = await connection.createChannel()

    const exchange = "mail_exchange2";
    const queue1 = "user_mail_queue";
    const routing_key1 = "send_mail_to_user";
    const queue2 = "subscribed_user_mail_queue";
    const routing_key2 = "send_mail_to_subscribed_user";

    await channel.assertExchange(exchange,"direct",{durable:false})
    await channel.assertQueue(queue1,{durable:false})
    await channel.assertQueue(queue2,{durable:false})
    await channel.bindQueue(queue1,exchange,routing_key1)
    await channel.bindQueue(queue2,exchange,routing_key2)

    const message1 ={
        to:"nishantpokharel9@gmail.com",
        from:"nirajisbaba@gmail.com",
        subject:"SUPP MY G",
        body:"randy orton jsnjskjas"
    }
    const message2 ={
        to:"nishantpokharel9@gmail.com",
        from:"nirajisbaba@gmail.com",
        subject:"SUPP MY G",
        body:"randy orton lamo "
    }

    channel.publish(exchange,routing_key1,Buffer.from(JSON.stringify(message1)))
    channel.publish(exchange,routing_key2,Buffer.from(JSON.stringify(message2)))

    console.log("Message sent normal",message1)
    console.log("message sent premium",message2)
    setTimeout(()=>{
        connection.close()
    },500) 
}
// send_mail_to_subscribed_user()
// send_mail_to_user()
send_mail_to_both_user()
