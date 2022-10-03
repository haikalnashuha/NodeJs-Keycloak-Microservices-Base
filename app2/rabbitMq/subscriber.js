const amqp = require('amqplib/callback_api');

const app2queue = 'forApp2';

const subscribe = () => {
    console.log('RabbitMQ subscription start..');
    amqp.connect('amqp://localhost', function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }            

            channel.assertQueue(app2queue, {durable: false});
            //console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", app2queue);
            channel.consume(app2queue, function(msg) {
                console.log("[App2 RCV] Received %s", msg.content.toString());
            }, {noAck: true});
        });        
    });
}

module.exports = subscribe;