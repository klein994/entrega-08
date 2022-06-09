import { clienteSqlAdmin as knex } from './clienteSql.js'

try {
    const exists = await knex.schema.hasTable('productos')
    if (!exists) {
        await knex.schema.createTable('productos', tabla => {
            tabla.increments('id'),
                tabla.string('tittle'),
                tabla.integer('price'),
                tabla.string('thumbnail')
        })
        console.log('tabla "productos" creada!')
    } else {
        console.log('la tabla "productos" ya existe. no se realizaron cambios.')
    }
} catch (error) {
    console.log(`fallo la operacion: ${error.message}`)
} finally {
    knex.destroy()
}try {
    const exists = await knex.schema.hasTable('mensajes')
    if (!exists) {
        await knex.schema.createTable('mensajes', tabla => {
            tabla.increments('id'),
                tabla.string('autor'),
                tabla.string('texto'),
                tabla.dateTime('fecha')
        })
        console.log('tabla "mensajes" creada!')
    } else {
        console.log('la tabla "mensajes" ya existe. no se realizaron cambios.')
    }
} catch (error) {
    console.log(`fallo la operacion: ${error.message}`)
} finally {
    knex.destroy()
}