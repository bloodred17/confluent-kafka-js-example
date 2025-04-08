import {KafkaJS} from '@confluentinc/kafka-javascript';
import 'dotenv/config'


const consumer = new KafkaJS.Kafka().consumer({
    'bootstrap.servers': process.env.BOOTSTRAP_SERVERS,
    'security.protocol': process.env.SECURITY_PROTOCOL,
    'sasl.mechanisms': process.env.SASL_MECHANISMS,
    'sasl.username': process.env.SASL_USERNAME,
    'sasl.password': process.env.SASL_PASSWORD,
    'group.id': 'js-consumer-group',
});

async function runConsumer() {
    try {
        await consumer.connect();
        await consumer.subscribe({ topics: ["notification"] });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log({
                    topic,
                    partition,
                    headers: message.headers,
                    offset: message.offset,
                    key: message.key?.toString(),
                    value: message.value.toString(),
                });
            }
        });

        // To handle graceful shutdown
        const shutdown = async () => {
            await consumer.disconnect();
            console.log('Consumer disconnected');
            process.exit(0);
        };

        // Handle termination signals
        process.on('SIGINT', shutdown);
        process.on('SIGTERM', shutdown);

    } catch (error) {
        console.error('Error in consumer:', error);
    }
}

runConsumer();