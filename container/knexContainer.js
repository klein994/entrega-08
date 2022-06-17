import crearKnex from 'knex'

export default class ContenedorKnex {
    constructor(config, tabla, createTable) {
        this.conexion = crearKnex(config);
        this.tabla = tabla;
        createTable(this.conexion, tabla);
    }
    async save(producto) {
        await this.conexion.insert(producto).into(this.tabla)
            .then(() => { console.log(`Agregado a la DB`, producto); })
            .catch(error => { console.log(error); })
        return producto;
    }
    async updateById(id, producto) {
        await this.conexion.from(this.tabla).where('id', id).update(producto)
            .then(() => { console.log(`Id:${id} actualizado`); })
            .catch(error => { console.log(error); })
    }
    async getById(id) {
        let contenido;
        await this.conexion.from(this.tabla).where('id', id).select('*')
            .then(rows => { contenido = rows; })
            .catch(error => { console.log(error); })
        return contenido;
    }
    async getAll() {
        let contenido;
        await this.conexion.from(this.tabla).select('*')
            .then(rows => { contenido = rows; })
            .catch(error => { console.log(error); })
        return contenido;
    }
    async deleteById(id) {
        await this.conexion.from(this.tabla).where('id', id).del()
            .then(() => { console.log(`Id:${id} eliminado`); })
            .catch(error => { console.log(error); })
    }
    async deleteAll() {
        await this.conexion.from(this.tabla).del()
            .then(() => { console.log(`Tabla ${this.tabla} vaciada`); })
            .catch(error => { console.log(error); })
    }
}