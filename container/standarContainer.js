import fs from 'fs'

export default class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }
    async save(producto) {
        let contenido = await this.getAll();
        producto.id = `${Date.now()}`;
        contenido.push(producto);
        await sobreescribrirArchivo(this.nombreArchivo, contenido);
        return producto;
    }
    async updateById(id, producto) {
        let contenido = await this.getAll();
        let productoBuscado = contenido.find(producto => producto.id == id);
        if(!productoBuscado) {
            const error = new Error('No existe un producto con ese id')
            error.tipo = 'Product not found'
            throw error;
        }
        productoBuscado.title = producto.title;
        productoBuscado.price = producto.price;
        productoBuscado.thumbnail = producto.thumbnail;
        await sobreescribrirArchivo(this.nombreArchivo, contenido);
        return productoBuscado;
    }
    async getById(id) {
        let contenido = await this.getAll();
        let object_encontrado = contenido.find(producto => producto.id == id);
        if(!object_encontrado) {
            const error = new Error('No existe un producto con ese id')
            error.tipo = 'Product not found'
            throw error;
        }
        return object_encontrado;
    }
    async getAll() {
        try {
            let contenido = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
            return JSON.parse(contenido);
        }
        catch (error) {
            return [];
        }
    }
    async deleteById(id) {
        let contenido = await this.getAll();
        let contenidoRestante;
        contenidoRestante = contenido.filter(producto => producto.id != id);
        if(contenidoRestante.length == contenido.length) {
            const error = new Error('No existe un producto con ese id')
            error.tipo = 'Product not found'
            throw error;
        }
        await sobreescribrirArchivo(this.nombreArchivo, contenidoRestante);
    }
    async deleteAll() {
        await sobreescribrirArchivo(this.nombreArchivo, []);
    }
}

async function sobreescribrirArchivo(nombreArchivo, datos) {
    try{
        await fs.promises.writeFile(nombreArchivo, JSON.stringify(datos, null, 2));
    }
    catch (error) {
        throw new Error(`Error en escritura: ${error.message}`);
    }
}