require('dotenv').config()
const express = require('express');
const cors = require('cors')
const path = require('path')

// use the React build folder for static files
app.use(express.static(path.join(path.dirname(__dirname), 'frontend', 'dist')))

const db = require('./models');

const reviewsCtrl = require('./controllers/reviews')
const usersCtrl = require('./controllers/users')


const app = express();

// /* Middleware */
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


// /* Mount routes*/
app.use('/api/reviews', reviewsCtrl)
app.use('/api/users', usersCtrl)

// Any other route not matching the routes above gets routed by React
app.get('*', (req, res) => {
    res.sendFile(path.join(path.dirname(__dirname), 'frontend', 'dist', 'index.html'));
});


app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});