require('dotenv').config();
const cors = require('cors');
const path = require('path');
const express = require('express');
const mongoose = require('./utils/database');

const TextProductRouter = require('./Routers/textProductosRouter');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(cors());
app.use('/textproductos', TextProductRouter);
app.listen(3010, () => {
    console.log('Servidor rulando');
});