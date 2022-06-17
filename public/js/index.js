const socket = io();

socket.on('connectionToServer', async ({ array_productos, array_mensajes }) => {
    await mostrar('formProducts', 'templates/form.handlebars', {});
    actualizarProductos(array_productos);
    mostrar('mensajes', 'templates/messages.handlebars', {});
    await actualizarMensajes(array_mensajes);
    agregarFuncionABotones();
});

socket.on('actualizarTabla', ({ array_productos }) => {
    actualizarProductos(array_productos);
});

socket.on('actualizarMensajes', ({ array_mensajes }) => {
    actualizarMensajes(array_mensajes);
})

const actualizarProductos = async (array_productos) => {
    let context = { titulo:"Productos", array_productos, hayProductos: array_productos.length > 0, total: array_productos.length };
    mostrar('tableProducts', 'templates/table.handlebars', context);
}

const actualizarMensajes = async (array_mensajes) => {
    let context = { array_mensajes, hayMensajes: array_mensajes.length > 0 }
    await mostrar('tableMensajes', 'templates/tableMessages.handlebars', context);
}

function agregarFuncionABotones() {
    const btn = document.getElementById('botonEnviar')
    btn.addEventListener('click', event => {
        const title = document.getElementById('title').value
        const price = document.getElementById('price').value
        const thumbnail = document.getElementById('thumbnail').value
        if(title.length>0 && price.length>0 && thumbnail.length>0){
            socket.emit('agregarProducto', { title, price, thumbnail })
        } else {
            alert('Todos los campos son obligatorios')
        }
    })
    const btn2 = document.getElementById("botonEnviarMensaje")
    btn2.addEventListener('click', event => {
        const email = document.getElementById('email').value
        const mensaje = document.getElementById('mensaje').value
        const fecha = new Date();
        const fechaString = fecha.getFullYear() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
        if(email.length>0 && mensaje.length>0){
            socket.emit('enviarMensaje', { email, mensaje, fechaString })
        } else {
            alert('Todos los campos son obligatorios')
        }
    })
    const btn3 = document.getElementById("botonEliminarProductos")
    btn3.addEventListener('click', event => {
        socket.emit("eliminarProductos")
    })
    const btn4 = document.getElementById("botonEliminarMensajes")
    btn4.addEventListener('click', event => {
        socket.emit("eliminarMensajes")
    })
}

async function mostrar(id, template, context) {
    const divProductos = document.getElementById(id);
    divProductos.innerHTML = await armarHtmlRemoto(template, context);
}

function armarHtmlRemoto(url, contexto) {
    return buscarPlantilla(url).then(plantilla => {
        const generarHtml = Handlebars.compile(plantilla);
        return generarHtml(contexto)
    })
}

function buscarPlantilla(url) {
    return fetch(url).then(res => res.text())
}

function eliminarProducto(id) {
    socket.emit('eliminarProducto', id);
}

function editarProducto(id) {
    const title = document.getElementById('title').value
    const price = document.getElementById('price').value
    const thumbnail = document.getElementById('thumbnail').value
    if(title.length>0 && price.length>0 && thumbnail.length>0){
        socket.emit('editarProducto', id, { title, price, thumbnail });
    } else {
        alert('Todos los campos son obligatorios')
    }
}