const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const api=require('./routers/api');
const app= express();

// app.use(cors({
//     origin: '*'
// }))

app.use(cors({
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 204
}));

app.use(morgan('combined'));

app.use(express.json());
app.use(express.static(path.join(__dirname, '..','public')));

app.use('/v1',api);

app.get('/', (req, res) => {
    res.send(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;