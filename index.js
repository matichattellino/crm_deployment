const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config( { path: 'variables.env' });

// cors permite que un cliente se conecte a otro servidor para intercambiar recursos
const cors = require('cors');

//conectar a mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser : true
});

//crear el servidor
const app = express();

//habilitar el body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

//definir un dominio para recibir las peticiones
const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: (origin, callback) => {
        console.log(origin);
        //revisar si la peticion viene de un servidor que esta en la whitelist
        const existe = whitelist.some(dominio => dominio === origin);
        if(existe) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'))
        }
    }
}

//habilitar cors
app.use(cors(corsOptions));

//rutas de la app
app.use('/', routes());

//carpeta publica
app.use(express.static('uploads'));

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;

//iniciar app
app.listen(port, host, () => {
    console.log('el servidor esta funcionando');
});