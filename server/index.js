import express from "express";
import mongoose from "mongoose";
import authRouter from "./routers/authRouter.js";
import { createServer } from "node:http";
import { Server } from 'socket.io';
import cors from 'cors';
import Message from "./models/Message.js";


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
    for(let { header, value } in corsHeaders){
        req.header(header, value);
        res.header(header, value);
    }
    next();
}

mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true}).then(() => {
    console.log('connected')
}).catch(err => console.log(err))

io.on('connection', (socket) => {

    socket.on('send-chat-message', (message) => {
        const msg = new Message({message})
        msg.save().then(() => {
            socket.emit('chat-message', message) 
            socket.broadcast.emit('chat-message', message)
        })
        // socket.emit('chat-message', message) // i will see msg i send
        // socket.broadcast.emit('chat-message', message) // other people in chat will see msg
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