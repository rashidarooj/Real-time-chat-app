const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
// process.env.PORT means jb localhost pr run ho ga jo bhi uska port number ho ga automatically call ho jaye ga
const port = 4500 || process.env.PORT;

const users = [{}];

//cors is used for intercommunication between URL
app.use(cors());
app.get("/", (req, res) => {
    res.send("Hello its working");
})

//to call express in a server
const server = http.createServer(app);

//How to use socket.io? io ka circuit bna dain gy
const io = socketIO(server);

//IO CIRCUIT K STH CONNECTION BNANAY K LIYE(CIRCUIT KO ON KRNY K LIYE)
//destructuring user
io.on("connection", (socket) => {
    console.log("New Connection");

    socket.on('joined', ({ user }) => {
        users[socket.id] = user;
        console.log(`${user} has joined`);
        socket.broadcast.emit('userJoined', { user: "Admin", message: `${users[socket.id]} has joined` });
        socket.emit('welcome', { user: "Admin", message: `Welcome to the chat,${users[socket.id]}` })
    })
    //emit means jis socket ny join kia hai sirf usi ko data show ho ga kisi or ko nhi ho ga

    //broadcast means jsy koi new person group mai add hota hai tou usay msg show ho ga welcome to the chat jo phly sy group mai add ho gy wo msg un k liye nhi ho ga or humain show ho ga user has joined


    socket.on('message', ({ message, id }) => {
        io.emit('sendMessage', { user: users[id], message, id });
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('leave', { user: "Admin", message: `${users[socket.id]} has left` });
        console.log(`user left`);
    })

});
//

//npm install socket.io-client react-scroll-to-bottom chat automatically scroll

server.listen(port, () => {
    console.log(`server is working on http://localhost:${port}`);
})