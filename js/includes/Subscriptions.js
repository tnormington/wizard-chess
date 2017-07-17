// const amplify = require('amplifyjs');
// import amplify from 'node-amplifyjs';
const postal = require('postal');

import Socket from './Socket.js';

function setupSubscriptions() {

    const socketMessage = postal.subscribe({
        channel: "socket",
        topic: "message.send",
        callback: function(data, envelope) {
            // `data` is the data published by the publisher. 
            // `envelope` is a wrapper around the data & contains 
            // metadata about the message like the channel, topic, 
            // timestamp and any other data which might have been 
            // added by the sender. 
            // console.log(data.message);
        }
    });

    const socketOpen = postal.subscribe({
        channel: "socket",
        topic: "status.open",
        callback: function(data, envelope) {
            // `data` is the data published by the publisher. 
            // `envelope` is a wrapper around the data & contains 
            // metadata about the message like the channel, topic, 
            // timestamp and any other data which might have been 
            // added by the sender. 
            // console.log(data.message + ':' + data.time);
        }
    });

    const socketClose = postal.subscribe({
        channel: "socket",
        topic: "status.close",
        callback: function(data, envelope) {
            // `data` is the data published by the publisher. 
            // `envelope` is a wrapper around the data & contains 
            // metadata about the message like the channel, topic, 
            // timestamp and any other data which might have been 
            // added by the sender. 
            // console.log(data.message);
        }
    });


    const socketError = postal.subscribe({
        channel: "socket",
        topic: "error",
        callback: function(data, envelope) {
            // `data` is the data published by the publisher. 
            // `envelope` is a wrapper around the data & contains 
            // metadata about the message like the channel, topic, 
            // timestamp and any other data which might have been 
            // added by the sender. 
            // console.log(data.message);
        }
    });


    const playerPlayedCard = postal.subscribe({
        channel: "playerAction",
        topic: "hand.playedCard",
        callback: function(data, envelope) {
            // console.log('played played card from hand');
            // console.log(data.message);
            // console.log('newTile: ', data.newTile);
        }
    });

    const playerHoverTile = postal.subscribe({
        channel: "playerAction",
        topic:"hand.hoverTile",
        callback: function(data, envelope) {
            // console.log(data.message);
            // console.log(data.tile);
        }
    });


    const playerActionGridUpdateTile = postal.subscribe({
        channel: "playerAction",
        topic: "grid.updateTile",
        callback: function(data, envelope) {
            // console.log(data.message);
            // console.log("enveloped: ", envelope);
        }
    });
}


export default setupSubscriptions;

// amplify.subscribe('socket/open', () => {
//     console.log('socket onopen');
//     amplify.publish('socket/message/send', 'Hello Socket World');
// });

// amplify.subscribe('socket/message', (data) => {
//     console.log('socket onmessage');
//     console.log(data.data);
// });


// amplify.subscribe('socket/message/send', (data) => {
//     Socket.send(data);
// });

// amplify.subscribe('socket/error', (data) => {
//     console.log('error');
// });

