require('dotenv').config();
const express = require('express');
const mongoose = require('./utils/database');
const cors = require('cors');
const path = require('path');

const moviesRouter = require('./Routers/MoviesRouter');
const categoriesRouter = require('./Routers/CategoryRouters');
const userRouter = require('./Routers/UsersRouter')

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/movies', moviesRouter);
app.use('/category', categoriesRouter);
app.use('/users', userRouter);
/* app.use('/comentary', comentarioRouter); */

app.listen(process.env.PORT, () => {
    console.log('Servidor rulando');
});


