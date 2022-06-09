import { getConfig } from './knexConfig.js'
import crearKnex from 'knex'

const clienteSqlAdmin = crearKnex(getConfig('ADMIN'))


export {
    clienteSqlAdmin,

}