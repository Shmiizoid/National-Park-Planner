const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        title: { type: String, maxLength: 30 },
        name: { type: String, required: true },
        content: { type: String, required: true },
        parkId: { type: String, required: true },
        tripDate: { type: Date, required: false},
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
);


module.exports = mongoose.model('Review', reviewSchema);