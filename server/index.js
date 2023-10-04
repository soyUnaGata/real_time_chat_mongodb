import express from "express";
import mongoose from "mongoose";
import authRouter from "./routers/authRouter.js";
import { createServer } from "node:http";
import { Server } from 'socket.io';
import cors from 'cors';
import Message from "./models/Message.js";
import { secret } from "./config.js";
import User from "./models/User.js";
import jwt from "jsonwebtoken";


const PORT = 5000;
const DB_URL = `mongodb+srv://fallensnitch:RqhyVoGBKO64vet6@clusterauth.ysmk2n9.mongodb.net/`;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
      origin: '*',
    }
});
const corsHeaders = {
    'Access-Control-Allow-Origin': "*",
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type'
};
 
app.use(express.json());
app.use('/auth', authRouter);
app.use(cors());
app.use(allowAnyCORS);

function allowAnyCORS (req, res, next) {
    for(let header in corsHeaders){
        req.header(header, corsHeaders[header]);
        res.header(header, corsHeaders[header]);
    }
    next();
}

mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true}).then(() => {
    console.log('connected')
}).catch(err => console.log(err))

async function startApp(){
    try{
        await mongoose.connect(DB_URL)
        httpServer.listen(PORT, () => console.log('SERVER WORKS ON PORT ' + PORT));
    } catch (e){
        console.log(e)
    }
}

io.use(function(socket, next){
    if (socket.handshake.query && socket.handshake.query.token){
      jwt.verify(socket.handshake.query.token, secret, function(err, decoded) {
        if (err) return next(new Error('Authentication error'));
        socket.decoded = decoded;
        next();
      });
    }
    else {
      next(new Error('Authentication error'));
    }    
})
.on('connection', function(socket) {  

    socket.on('user', function(data) {
        socket.emit('user-connected', socket.decoded.username)
        console.log('user token data', socket.decoded)
        console.log('Its data', data)
    });

    socket.on('send-chat-message', (message) => {
        console.log('Received message:', message);
        console.log('socket by', socket.decoded)

        const msg =  new Message({ userId: socket.decoded.id, username: socket.decoded.username, message: message });
        msg.save() 
        .then((result) => {
            socket.emit('chat-message', { username: socket.decoded.username, message: message });
        })
        .catch((err) => {
            console.log('err', err)
        })
    
        // Broadcast the message to all connected clients
        //socket.emit('chat-message', socket.decoded);
    })
});

startApp();