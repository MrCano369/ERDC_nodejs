const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
const app = express();

//settings
app.set('view engine', 'ejs');

//middlewares
//app.use(morgan('dev'));
app.use('', express.static(__dirname + '/'));
app.use(routes);

app.listen(process.env.PORT || 3000, () => console.log('Server funcionando'));