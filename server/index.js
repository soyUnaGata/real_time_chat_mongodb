import express from "express";
import mongoose from "mongoose";
import authRouter from "./routers/authRouter.js";
import { createServer } from "node:http";
import { Server } from 'socket.io';
import cors from 'cors';


const PORT = 5000;
const DB_URL = `mongodb+srv://fallensnitch:RqhyVoGBKO64vet6@clusterauth.ysmk2n9.mongodb.net/`;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
      origin: '*',
    }
});

 
app.use(express.json());
app.use('/auth', authRouter);
app.use(cors());
app.use(allowCrossDomain);

function allowCrossDomain (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    req.header('Access-Control-Allow-Origin', "*");
    req.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    req.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

io.on('connection', (socket) => {

    socket.on('send-chat-message', (message) => {
        socket.emit('chat-message', message) // i will see msg i send
        socket.broadcast.emit('chat-message', message) // other people in chat will see msg
    });

    // io.on('connection', (socket) => {
    //     socket.on('disconnect', () => {
    //       console.log('user disconnected');
    //     });

    //     socket.broadcast.emit('user-connected', name)

    // });


    // socket.on('send name', (user) => {
    //     io.emit('send name', user);
    // });
 
    // socket.on('send message', (chat) => {
    //     io.emit('send message', chat);
    // });
});

async function startApp(){
    try{
        await mongoose.connect(DB_URL)
        httpServer.listen(PORT, () => console.log('SERVER WORKS ON PORT ' + PORT));
    } catch (e){
        console.log(e)
    }
}



startApp();