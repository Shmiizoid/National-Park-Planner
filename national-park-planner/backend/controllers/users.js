const jwt = require('jwt-simple')
const express = require('express')
const router = express.Router()
const db = require('../models')
const User = db.User;


const config = require('../../jwt.config.js')


/* Routes */
router.post('/signup', (req, res) => {
    // Create a new user
    db.User.create(req.body)
        .then(user => {
            const token = jwt.encode({ id: user.id }, config.jwtSecret)
            res.json({ token: token })
        })
        .catch(() => {
            res.sendStatus(401)
                .json({ data: 'Could not create a new user, try again' })
        })
})

// LOG IN 
router.post('/login', async (req, res) => {

    const foundUser = await User.findOne({ email: req.body.email })

    if (foundUser && foundUser.password === req.body.password) {
        const payload = { id: foundUser.id }
        const token = jwt.encode(payload, config.jwtSecret)
        res.json({
            token: token,
            email: foundUser.email
        })
    } else {
        res.sendStatus(401)
    }
})

module.exports = router