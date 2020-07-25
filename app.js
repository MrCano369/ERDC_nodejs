const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
//const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

//////////bdd//////////
mongoose.connect("mongodb+srv://MrCano369:acr3945@mrcano369-sbz3s.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
var Schema = mongoose.Schema;
var esquemaUsuario = new Schema({
    nombre: String,
    correo: String,
    clave: String,
    img: String,
    coins: Number,
    exp: Number,
    active: Boolean
});
var Usuario = mongoose.model('Usuario', esquemaUsuario);

//////////settings//////////
app.set('view engine', 'ejs');

//////////middlewares//////////

//app.use(morgan('dev'));
app.use('', express.static(__dirname + '/'));
app.use(express.json());
//app.use(cookieParser());
app.use(session({
    secret: 'pene',
    resave: false,
    saveUninitialized: true
}));
app.use(routes);

//////////routes//////////
app.post('/registro', async (req, res) => {
    //console.log(req.body);
    if(await Usuario.findOne({ nombre: req.body.nombre })) res.send('1');
    else if(await Usuario.findOne({ correo: req.body.correo })) res.send('2');
    else{
        req.body.img = 'public/img/persona.png';
        req.body.coins = 50;
        req.body.exp = 0;
        req.body.active = false;
        req.session.user = await new Usuario(req.body).save();
        res.send('3')
    }
});

app.post('/login', async (req, res) => {
    //console.log(req.body);
    var user = await Usuario.findOne({ nombre: req.body.nombre });
    if(user){
        if(user.clave == req.body.clave){
            req.session.user = user;
            res.send('3');
        }else res.send('2');
    }else res.send('1');
});

app.listen(process.env.PORT || 3000, () => console.log('Server funcionando'));