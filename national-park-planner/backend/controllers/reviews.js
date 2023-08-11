const express = require('express')
const jwt = require('jwt-simple');
const router = express.Router()

const db = require('../models')
const config = require('../../jwt.config.js')

// Middleware
const authMiddleware = (req, res, next) => {

    const token = req.headers.authorization;
    if (token) {
        try {
            const decodedToken = jwt.decode(token, config.jwtSecret);
            req.user = decodedToken;
            next();
        } catch (err) {
            res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        res.status(401).json({ message: 'Missing or invalid Authorization header' });
    }
};

// Routes

// Index
router.get('/:parkId', function (req, res) {
    db.Review.find({ parkId: req.params.parkId})
        .then(reviews => {
            res.json(reviews)
        })
})

// Create
router.post('/', authMiddleware, (req, res) => {
    db.Review.create({
        ...req.body,
        userId: req.user.id
    })
        .then(review => res.json(review))
})

// Update
router.put('/:id', authMiddleware, async (req, res) => {
    const userReview = await db.Review.findById(req.params.id)
    if (userReview.userId.toString() === req.user.id) {
        const newReview = await db.Review.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.json(newReview)
    } else {
        res.status(401).json({ message: 'Invalid user or token' });
    }
})

// Destroy
router.delete('/:id', authMiddleware, async (req, res) => {
    const userReview = await db.Review.findById(req.params.id)
    if (userReview.userId.toString() === req.user.id) {
        const deletedReview = await db.Review.findByIdAndRemove(req.params.id)
        res.send('You deleted review ' + deletedReview._id)
    } else {
        res.status(401).json({ message: 'Invalid user or token' });
    }
})

module.exports = router