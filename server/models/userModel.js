const mongoose = require("mongoose");
const { Schema } = require("mongoose")

const User = mongoose.model(
    'Users',
    new Schema({
        username: {
            type: String,
            required: true,
            min: 3,
            max: 20,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            max: 50,
        },
        password: {
            type: String,
            required: true,
            min: 8,
        },
        isAvatarImageSet: {
            type: Boolean,
            default: false
        },
        avatarImage: {
            type: String,
            default: ""
        }
    })
)

module.exports = User;