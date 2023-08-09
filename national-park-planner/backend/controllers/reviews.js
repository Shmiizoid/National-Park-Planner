const express = require('express')
const router = express.Router()

const db = require('../models')

// Routes

// Index
router.get('/', function (req, res) {
    db.Review.find({})
        .then(reviews => res.json(reviews))
})

// Create
router.post('/', (req, res) => {
    db.Review.create(req.body)
        .then(review => res.json(review))
})

// Update
router.put('/:id', (req, res) => {
    db.Review.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then(review => res.json(review))
})

// Destroy
router.delete('/:id', (req, res) => {
    db.Review.findByIdAndRemove(req.params.id)
        .then(() => res.json({ deletedReviewId: req.params.id }))
})

module.exports = router