import {KafkaJS} from '@confluentinc/kafka-javascript';
import 'dotenv/config'


async function producerStart() {
    const producer = new KafkaJS.Kafka().producer({
        'bootstrap.servers': process.env.BOOTSTRAP_SERVERS,
        'security.protocol': process.env.SECURITY_PROTOCOL,
        'sasl.mechanisms': process.env.SASL_MECHANISMS,
        'sasl.username': process.env.SASL_USERNAME,
        'sasl.password': process.env.SASL_PASSWORD,
    });

    try {
        await producer.connect();
        console.log("Connected successfully");

        const res = [];
        for (let i = 0; i < 10; i++) {
            res.push(producer.send({
                topic: 'notification',
                messages: [
                    { value: 'v', partition: 0, key: 'x' },
                ]
            }));
        }
        await Promise.all(res);
        console.log("Successfully sent all messages");
    } catch (error) {
        console.error("Error in producer:", error);
    } finally {
        // Handle graceful shutdown
        await producer.disconnect();
        console.log("Disconnected successfully");
    }
}

// Add keyboard interrupt handling
process.on('SIGINT', async () => {
    console.log('\nKeyboard interrupt detected (CTRL+C)');
    console.log('Shutting down producer...');
    process.exit(0);
});

// Run the producer
producerStart().catch(error => {
    console.error("Producer failed:", error);
    process.exit(1);
});