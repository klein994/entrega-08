import express from 'express';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import socketController from './controllers/socketController.js';
import webRouter from './router/webRouter.js';

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static('./public'))
app.use('/', webRouter)

io.on('connection', socket => socketController(socket, io))

const server = httpServer.listen(8080, () => {
    console.log(`Escuchando en el puerto ${server.address().port}`)
})