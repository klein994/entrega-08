const { ControladorApi } = require('./controladoresApi.js');
const productos = new ControladorApi("./database/productos.json");
const mensajes = new ControladorApi('./database/mensajes.json');

async function socketController(socket, io) {
    console.log('Usuario conectado: ' + socket.id)
    const DBproductos = await productos.getAll();
    const DBmensajes = await mensajes.getAll();
    socket.emit('connectionToServer', { DBproductos, DBmensajes })

    socket.on('agregarProducto', async(data) => {
        await productos.save(data);
        io.sockets.emit('actualizarTabla', { DBproductos: await productos.getAll() })
    })

    socket.on("enviarMensaje", async(data) => {
        await mensajes.save(data);
        io.sockets.emit('actualizarMensajes', { DBmensajes: await mensajes.getAll() })
    })
}

module.exports = { socketController }