const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true, // Ensure category names are unique
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Category', CategorySchema);