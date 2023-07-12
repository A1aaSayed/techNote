const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
    },
    role: {
        type: String,
        enum: ['employee', 'manager', 'admin'],
        default: 'employee',
    },
    status: {
        type: Boolean,
        default: true,
    }
});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;