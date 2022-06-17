export const createTableProductos = (knex, tabla) => {
    knex.schema.hasTable(tabla)
        .then(exists => {
            if (!exists) {
                knex.schema.createTable(tabla, tabla => {
                    tabla.increments('id'),
                        tabla.string("title"),
                        tabla.decimal('price', 8, 2),
                        tabla.string("thumbnail")
                }).then(() => {
                    console.log(`Tabla ${tabla} creada!`)
                })
            }
        })
        .catch(error => {
            console.log(error);
        })
}

export const createTableMensajes = (knex, tabla) => {
    knex.schema.hasTable(tabla)
        .then(exists => {
            if (!exists) {
                knex.schema.createTable(tabla, tabla => {
                    tabla.increments('id'),
                        tabla.string("email"),
                        tabla.string("fechaString"),
                        tabla.string("mensaje")
                }).then(() => {
                    console.log(`Tabla ${tabla} creada!`)
                })
            }
        })
        .catch(error => {
            console.log(error);
        })
}