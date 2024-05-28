import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import mainRouter from './routes/main.js';
import bodyParser from 'body-parser';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST']
  }
});

app.use(cors({
  origin: 'http://localhost:5173' 
}));
app.use(bodyParser.json());
app.use('/api/v1', mainRouter);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
