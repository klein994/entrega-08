import ContenedorKnex from '../container/knexContainer.js';
import { createTableProductos, createTableMensajes } from '../database/createTable.js';

const dbProductos = {
    client: 'mysql2',
    connection: {
        host: "127.0.0.1",
        port: 3306,
        user: "root",
        password: "",
        database: "coderhouse"
    }
}

const dbMensajes = {
    client: "sqlite3",
    connection: {
        filename: "./database/ecommerce.sqlite"
    },
    useNullAsDefault: true
}

const productos = new ContenedorKnex(dbProductos, "productos", createTableProductos);
const mensajes = new ContenedorKnex(dbMensajes, "mensajes", createTableMensajes);

async function socketController(socket, io) {
    const array_productos = await productos.getAll();
    const array_mensajes = await mensajes.getAll();
    socket.emit('connectionToServer', { array_productos, array_mensajes })

    socket.on('agregarProducto', async (data) => {
        await productos.save(data);
        io.sockets.emit('actualizarTabla', { array_productos: await productos.getAll() })
    })
    socket.on("enviarMensaje", async (data) => {
        await mensajes.save(data);
        io.sockets.emit('actualizarMensajes', { array_mensajes: await mensajes.getAll() })
    })
    socket.on("eliminarProductos", async () => {
        await productos.deleteAll();
        io.sockets.emit('actualizarTabla', { array_productos: await productos.getAll() })
    })
    socket.on("eliminarMensajes", async () => {
        await mensajes.deleteAll();
        io.sockets.emit('actualizarMensajes', { array_mensajes: await mensajes.getAll() })
    })
    socket.on("eliminarProducto", async (id) => {
        await productos.deleteById(id);
        io.sockets.emit('actualizarTabla', { array_productos: await productos.getAll() })
    })
    socket.on("editarProducto", async (id, producto) => {
        await productos.updateById(id, producto);
        io.sockets.emit('actualizarTabla', { array_productos: await productos.getAll() })
    })
}

export default socketController;