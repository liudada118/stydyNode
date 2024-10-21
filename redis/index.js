const net = require('net')
const redis = require('redis')

var server = net.createServer(function(socket){
    var subscriber ;
    var publisher;
    subscriber = redis.createClient()
    publisher = redis.createClient()
    socket.on('connect'  ,function(){
       
        subscriber.subscribe('main_chat_room')

        subscriber.on('message' , function(channel , message){
            socket.write('Channel' + channel + ': ' + message)
        })

        
    })

    socket.on('data' , function(data){
        console.log(publisher)
        publisher.publish('main_chat_room' , data);
    })

    socket.on('end' , function(){
        subscriber.unsubScribe('main_chat_room')
        subscriber.end()``
        publisher.end()
    })
})

server.listen(3000)