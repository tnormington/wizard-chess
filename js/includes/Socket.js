// const amplify = require('amplifyjs');
// import amplify from 'node-amplifyjs';
const postal = require('postal');


const onOpen = function() {
        // console.log("Socket opened.");
        // Socket.send("Hi, Server!");
        // amplify.publish('socket/open');
        postal.publish({
            channel: "socket",
            topic: "status.open",
            data: {
                message: "socket open",
                time: new Date()
            }
        });
    },
    onClose = function() {
        // console.log("Socket closed.");
        postal.publish({
            channel: "socket",
            topic: "status.close",
            data: {
                message: "socket close"
            }
        });
    },


    onMessage = function(data) {
        // console.log("We get signal:");
        // console.log(data.data);
        // amplify.publish('socket/message', data);
        postal.publish({
            channel: "socket",
            topic: "message.send",
            data: {
                message: "socket message"
            }
        });
    },


    onError = function() {
        // console.log("We got an error.");
        // amplify.publish('socket/error');
        postal.publish({
            channel: "socket",
            topic: "error",
            data: {
                message: "socket error"
            }
        });
    },

    
    Socket = new WebSocket("ws://echo.websocket.org/");

Socket.setupSocketHandlers = function() {
    Socket.onopen = onOpen;
    Socket.onclose = onClose;
    Socket.onerror = onError;
    Socket.onmessage = onMessage;
}






export default Socket;