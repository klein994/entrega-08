const socket = io()

socket.on('connectionToServer', async({ DBproductos, DBmensajes }) => {
    await mostrar('formProducts', 'templates/datos.handlebars', {});
    actualizarProductos(DBproductos);
    await actualizarMensajes(DBmensajes);
    agregarFuncionABotones();
});

socket.on('actualizarTabla', ({ DBproductos }) => {
    actualizarProductos(DBproductos);
});

socket.on('actualizarMensajes', ({ DBmensajes }) => {
    actualizarMensajes(DBmensajes);
})

const actualizarProductos = async(DBproductos) => {
    let context = { DBproductos, hayProductos: DBproductos.length > 0, total: DBproductos.length };
    mostrar('products', 'templates/partials/productos.handlebars', context);
}

const actualizarMensajes = async(DBmensajes) => {
    context = { DBmensajes, hayMensajes: DBmensajes.length > 0 }
    await mostrar('mensajes', 'templates/partials/mensajes.handlebars', context);
}

function agregarFuncionABotones() {
    const btn = document.getElementById('botonEnviar')
    btn.addEventListener('click', event => {
        const tittle = document.getElementById('tittle').value
        const price = document.getElementById('price').value
        const thumbnail = document.getElementById('thumbnail').value
        if (tittle.length > 0 && price.length > 0 && thumbnail.length > 0) {
            socket.emit('agregarProducto', { tittle, price, thumbnail })
        } else {
            alert('Todos los campos son obligatorios')
        }
    })
    const btn2 = document.getElementById("botonEnviarMensaje")
    btn2.addEventListener('click', event => {
        const autor = document.getElementById('autor').value
        const texto = document.getElementById('texto').value
        const date = new Date();
        const fecha = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        if (autor.length > 0 && texto.length > 0) {
            socket.emit('enviarMensaje', { autor, texto, fecha })
        } else {
            alert('Todos los campos son obligatorios')
        }
    })
}

const urls = {
    datos: 'static/templates/datos.handlebars',
    mensajes: 'static/templates/partials/mensajes.handlebars',
    productos: 'static/templates/partials/productos.handlebars'
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

cargarPartial('mensajes', urls.mensajes)
cargarPartial('productos', urls.productos)