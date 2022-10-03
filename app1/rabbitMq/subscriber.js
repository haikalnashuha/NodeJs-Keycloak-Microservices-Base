const config = require('../config');
const amqp = require('amqplib/callback_api');

const rabbitMqServer = config.rabbitServer;
const app1queue = config.app1Queue;

const subscribe = () => {
    console.log('RabbitMQ subscription start..');
    amqp.connect(rabbitMqServer, function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }            

            channel.assertQueue(app1queue, {durable: false});
            //console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", app1queue);
            channel.consume(app1queue, function(msg) {
                console.log("[App1 RCV] Received %s", msg.content.toString());
            }, {noAck: true});
        });        
    });
}

module.exports = subscribe;