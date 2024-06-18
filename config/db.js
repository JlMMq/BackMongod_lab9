const mongoose = require('mongoose')

//function arrow
const conectarDB = async () => {
    try{
        //Conexion a la base de datos: 01:21:00
        await mongoose.connect('mongodb://127.0.0.1:27017/PruebaBD',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        console.log(`BD Conectada`)
    }
    catch(error){
        console.log(error)
        process.exit(1) //esto detiene la aplicacion
    }
}

module.exports = conectarDB