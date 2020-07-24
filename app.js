const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

//////////bdd//////////
mongoose.connect("mongodb+srv://MrCano369:acr3945@mrcano369-sbz3s.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
var Schema = mongoose.Schema;
var Esquema = new Schema({
    nombre: String,
    correo: String,
    clave: String
});
var Usuario = mongoose.model('Usuario', Esquema);

//////////settings//////////
app.set('view engine', 'ejs');

//////////middlewares//////////

//app.use(morgan('dev'));
app.use('', express.static(__dirname + '/'));
app.use(routes);
app.use(bodyParser.json());

//////////routes//////////
app.post('/registrar', (req, res) => {
    //console.log(req.body);
    Usuario.findOne({ nombre: req.body.nombre })
    .then(yaHayAlguien => {
        if(yaHayAlguien) res.send({r: false, msg: 'El nombre de usuario ya existe.'});
        else new Usuario(req.body).save().then(data => res.send({r: true, msg: 'Registro exitoso.'}));
    })
});

app.listen(process.env.PORT || 3000, () => console.log('Server funcionando'));