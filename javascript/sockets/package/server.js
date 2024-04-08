const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
console.clear();
const app = express();
app.use(express.static(path.join(__dirname)))
const server = http.createServer(app);
const io = new Server(server);

const users = [];





io.on('connection', (socket) => {


    socket.on('register', (user) => {
        users.push(user)
        console.log(`${user.name} connected`);
    })



    socket.on('join-room', (user) => {
        socket.join(user.room);
        console.log(`${user.name} connected to room ${user.room},rooms: ${Array.from(socket.rooms).join(' , ')}`);
        const rooms = Array.from(socket.rooms).slice(1);
        socket.emit('rooms', rooms);
    })


    socket.on('msg', ({ msg, room, name }) => {
        console.log(`${name}: ${msg} in[${room}]`);
        if (msg) {
            if (room[0]) {
                socket.to(room[0]).emit('nmsg', ({ msg: msg, name: name }));
            } else {
                io.emit('nmsg', { msg: msg, name: name });
            }
        }
    })




});



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
