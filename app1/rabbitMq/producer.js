const config = require('../config');
const amqp = require('amqplib/callback_api');

const rabbitMqServer = config.rabbitServer;
const app2Queue = config.app2Queue;

const rabbitProducer = {
    rabbitChannel: undefined,
    
    start: () => {
        amqp.connect(rabbitMqServer, function(error0, connection) {
            if (error0) {
                throw error0;
            }
    
            connection.createChannel(function(error1, channel) {
                if (error1) {
                    throw error1;
                }
                
                rabbitChannel = channel;
                
                
                const msg = 'Hello from App1';
    
                channel.assertQueue(app2Queue, {durable: false});
    
                channel.sendToQueue(app2Queue, Buffer.from(msg));
                console.log(" [x] Sent %s", msg);
                
            });
    
            /*Not a good idea to close connection per message.
            setTimeout(function() {
                //connection.close();
                //process.exit(0)
            }, 500);
            */
        });
    },

    sendToApp2: (message) => {
        if(!rabbitChannel){
            throw 'Channel not established';
        }
                
        rabbitChannel.sendToQueue(app2Queue, Buffer.from(message));
        console.log("[App1 -> App2 using " + app2Queue + " ] Sent %s", message);
    }    
}


module.exports = {rabbitProducer}