const express = require("express");
//imported express
const app = express();
//created an instance of express
//now i wanted to make this server very secure 
const createServer = require("http").createServer;
//imported http module and used the createServer method to create a server
//i will use this server to listen to incoming requests

// -----------------socket layer - real time communication
//-----------------express layer - routing layer
// -----------------http layer server running on port 3000


//vishooverma.com/chat - socket layer

//amazon.in/chat -> socket layer 
//amazon.in/products -> express layer
// www.amazon.in -> http layer
//airtel -> tcp/ip 

const socket= require("socket.io");
const cors = require("cors");
app.use(cors());
//used cors middleware to allow cross origin requests
const httpserver = createServer(app);
//http handshake is done by the httpserver


const io = new socket.Server(httpserver, {
    cors: {
        origin: "*",
        //whatsapp -> facebook? 
        methods: ["GET", "POST"],
        // credentials: true,
        // allowedHeaders: ["my-custom-header"],
    },
})

// io-> name of our server
// methods on socket -> on, emit
// on -> listen to events
//socket documentation 
io.on("connection", (socket)=>{
    console.log("New Connection");

    socket.on("message", (data)=>{
        console.log(data);
        // io.emit("forward", data);
        socket.to(data.reciever).emit("forward", data.message);
        //socket.to(reciever) -> is a prebuikt socket.io method that allows
        //us to send message to a specific user that we want to send the message to
    })

    socket.on("joinRoom", (room)=>{
        //if there exists a room with the room name, the client will be added to that
        //if the room doesnt exist
        //a new room will be created and the client will be added to that room
        socket.join(room);
        console.log(`${socket.id} Joined room ${room}`);
    })

})



// app.get("/", (req, res) => {})


//Cross Origin Resource Sharing (CORS) is a security feature that restricts what resources a web page can request from another domain.
//The CORS policy is enforced by the browser.



app.get("/", (req, res) => {
    res.send("Hello World");
});






httpserver.listen(3000, () => {
    console.log("Server is running on port 3000");
    });