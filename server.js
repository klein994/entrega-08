const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const { socketController } = require('./controllers/controladoresSocket.js')


const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const { webRouter } = require('./router/webRouter.js')

app.use(express.static('./public'))
app.use('/', webRouter)

io.on('connection', socket => socketController(socket, io))


const PORT = 8080
const server = httpServer.listen(PORT, () => {
    console.log(`escuchando en el puerto ${server.address().port}`)
})