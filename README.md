# 11-ts-RestServer

## Installar ts de manera global

- npm i -g typescript(windows)
- sudo npm i -g typescript(linux mac)
- **tsc -v** : verificar la version de ts

- npm init -y: Instalar el package.json
- tsc --init: Crear el archivo de configuracion de ts

### Configuraciones en el archivo tsconfig

- "outDir": "./dist"
- "strict": true,
- "esModuleInterop": true,
- "sourceMap": true,(descomentado)
- "moduleResolution": "node10",(descomentado, no importa la version de node que tenga)

### Una vez tengamos todo lo anterior

- Crear nuestro app.ts y correr el comando _**tsc**_ y nos deberia crear la carpeta dist con el archivo app.js

- npm i tslint --save-dev : para añadir reglas adicionales a las que ya tiene ts cuando desarrollamos y trabajar con los estandares de desarrollo.

- npm i typescript --save-dev : installar ts de manera local en nuestro proyecto

- ./node_modules/.bin/tslint --init: Para inicializar el archivo del tslint.json

- Dentro del archivo tslint.json escribir esta regla, es para que no me tire errores cuando uso la consola o algo asi.

"rules": {
"no-console":false
}

### Crear la carpeta models en la raiz del proyecto y dentro de models, server.ts

- npm i express cors dotenv

- npm i --save-dev @types/express: archivo de definicion de tipos de express

### Scripts para ejecutar(de preferencia 1 en diferente terminal)

- nodemon dist/app.js
- tsc --watch

"scripts": {
"dev": "nodemon ./dist/app.js", //Revisa los cambios en los archivos de dist
"ts": "tsc --watch", //REvisa los cambios en los archivos ts
},

### Si quieres simplificar y usar un solo comando sin usar nodemon y tsc --watch

INSTALAR

- npm install ts-node-dev --save-dev

Agregar este script en el package.json

- "dev": "ts-node-dev ./app.ts",

### Configuraciones de BASE DE DATOS

Ya debemos tener instalado mySql o postgre y tablePlus

1. En TablePlus damos en create new Connection

   - Seleccionamos la BD
   - Name: Lo que sea
   - host: localhost
   - port: 3306(por defecto)
   - username: root(si no hemo configurado otra cosa)
   - password: lo dejamos vacio(si no hemos configurado otra cosa)
   - Click en test y se pone en verde esta todo bien.
   - Click en Save
   - Abrir la DB que creamos y podemos empezar a trabajar

2. Al abrir la DB qeu acabamos de crear se nos abre una interfaz, hacemos click en "open a databas"(a un lado de SQL)
   - Damos click en el signo de +
   - name: lo que sea
   - Click en OK
3. Crear una nueva tabla(clic derecho sobre el lado izq, debajo sel apartado de Tables)

   - Name: Usuarios

4. CONECTADO A NUESTRO BACKEND
   Installar sequelize ORM(sequelize.org) - npm i --save sequelize - Revisa la documentacion porque depende de que BD estemos usando es el controlador que vamos a installar despues

5. En nuestro backend creamos otra carpeta llamada db o lo que quieras

   - creamos el archivo conecction.ts
   - Configuraciones dentro del archivo

   ```typescript
   import { Sequelize } from "sequelize";

   const db = new Sequelize(
     "<nombre de la base de datos como le pusiste en TablePlus>",
     "<nombre de usuario>",
     "<password>",
     {
       host: "localhost",
       dialect: "mysql",
       // logging: false, //sirve para ver los logs de impactos qeu se hacen en la base de datos
     }
   );

   export default db;
   ```

   - agregar la conexion en nuestro server

   ```typescript
   async dbConnection(){
       //Usamos try catch por si acaso algo falla en la DB
       try {

           await db.authenticate();
           console.log("Database Online");

       } catch (error) {
           throw new Error(error as string)
       }
   }
   ```

### Creando modelos de usuario

    - En la carpeta models cramos un nuevo archivo usuario.model.ts

    ```typescript
    import { DataTypes } from 'sequelize'
    import db from '../db/connection'

    const Usuario = db.define("Usuario",{
        nombre:{
            type:DataTypes.STRING,
        },
        email:{
            type:DataTypes.STRING,
        },
        estado:{
            type:DataTypes.BOOLEAN,
        },
    })

    export default Usuario
    ```
