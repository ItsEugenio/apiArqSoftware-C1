import amqp from 'amqplib';

export async function connectRabbitMQ(): Promise<amqp.Connection> {
    const connection = await amqp.connect('amqp://localhost');
    return connection;
}
