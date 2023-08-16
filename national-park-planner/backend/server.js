require('dotenv').config()
const express = require('express');
const cors = require('cors')
const path = require('path')
const app = express();

const db = require('./models');

const reviewsCtrl = require('./controllers/reviews')
const usersCtrl = require('./controllers/users')

// /* Middleware */
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(express.static(path.join(path.dirname(__dirname), 'frontend', 'dist')))

// /* Mount routes*/
app.use('/api/reviews', reviewsCtrl)
app.use('/api/users', usersCtrl)

app.get('*', (req, res) => {
    res.sendFile(path.join(path.dirname(__dirname), 'frontend', 'dist', 'index.html'));
});

app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});