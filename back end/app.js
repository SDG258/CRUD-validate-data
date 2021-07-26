const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
require('express-async-errors');

const app = express();

app.use(cors());
 
app.use(morgan('dev'));
app.use(express.json());
 
app.get('/', function (req, res) {
    res.json({
        message: 'Hello Sakila Backend!'
    });
});

app.use('/api/actors', require('./routes/actor.route'));
app.use('/api/customers', require('./routes/customer.route'));

app.get('/err', function (req, res) {
    throw new Error('BROKEN'); // Express will catch this on its own.
})

app.use(function (req, res, next) {
    res.status(404).json({
        error_message: 'Not Found!!!'
    });
})

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({
        error_message: 'Someting Broke!!!'
    });
})
  
const PORT = 3000;
app.listen(PORT, function(){
    console.log(`Sakila Backend is running at http://localhost:${PORT}`);
});