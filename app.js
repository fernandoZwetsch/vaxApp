require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./src/routes');
app.use(express.json());
app.use(routes);
 
const porta = process.env.PORT || 3000;
app.listen(porta);
