import {Sequelize} from 'sequelize'

const db = new Sequelize("<nombre de la base de datos como le pusiste en TablePlus>", "<nombre de usuario>", "<password>",{

    host: "localhost",
    dialect: 'mysql',
    // logging: false, //sirve para ver los logs de impactos qeu se hacen en la base de datos
})

export default db