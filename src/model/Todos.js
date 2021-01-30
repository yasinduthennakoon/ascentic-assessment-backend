const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    description: {
        type: String,
        required: true,
        min: 6,
        max: 2500,
    },
    activeStatus: {
        type: Boolean,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        min: 6,
        max: 255,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Todos', todoSchema);
