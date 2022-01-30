const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require('mysql2');
const sequelize = require('./config/connection');

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// put routes here

//turn on connection to db and server
sequelize.sync({ force: false}).then(() => {
    app.listen(PORT, () => console.log('Now listening!'));
});
