import { User } from "../../domain/User";
import { connectRabbitMQ } from "./RabbitMQConfig";

export async function sendUserToQueue(user: User): Promise<void> {
    const connection = await connectRabbitMQ();
    const channel = await connection.createChannel();
    const queueName = 'user_queue';

    await channel.assertQueue(queueName, { durable: false });
    await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(user)));

    console.log(`User sent to queue: ${JSON.stringify(user)}`);

    setTimeout(() => {
        connection.close();
    }, 500);
}

export async function consumeUserFromQueue(callback: (user: User) => void): Promise<void> {
    const connection = await connectRabbitMQ();
    const channel = await connection.createChannel();
    const queueName = 'user_queue';

    await channel.assertQueue(queueName, { durable: false });
    await channel.consume(queueName, (message) => {
        if (message !== null) {
            const user: User = JSON.parse(message.content.toString());
            if (user) { // Verificar si el usuario no es null
                callback(user);
                channel.ack(message);
            }
        }
    });

    console.log(`Listening for messages from queue: ${queueName}`);
}