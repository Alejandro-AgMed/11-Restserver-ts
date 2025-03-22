import express,{Application} from 'express'
import userRoutes from '../routes/usuario.routes'
import cors from 'cors'
import db from '../db/connection'


class Server {

    private app: Application
    private port: string
    private apiRoutes = {
        usuarios: '/api/usuarios'
    }

    constructor(){
        this.app = express()
        this.port = process.env.PORT || "8000"

        this.dbConnection()

        this.middlewares()

        //Definir mis rutas
        this.routes()
    }

    //CONECTAR DDBB
    async dbConnection(){
        //Usamos try catch por si acaso algo falla en la DB
        try {
            
            await db.authenticate();
            console.log("Database Online");
            



        } catch (error) {
            throw new Error(error as string)
        }
    }

    middlewares(){
        //CORS
        this.app.use(cors())

        //LECTURA BODY
        this.app.use(express.json())

        //CARPETA PUBLICA(para servir contenido estatico por ejemplo, para ver so funciona ir al navegador y escribir localhost:8000 deberia mostrarse el acceso denegado)
        this.app.use(express.static("public"))
    }

    routes() {
        this.app.use(this.apiRoutes.usuarios,userRoutes)
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log("Server running on port", + this.port);
        })
    }


}

export default Server