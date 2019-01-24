const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");
const Schema   = mongoose.Schema;

const usersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    date: {
        type: Date,
        default: Date.now()
    }
});

usersSchema.methods.hashPassword = (user) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);

    user.password = hash;

    return user.save();
};

const User = module.exports = mongoose.model("User", usersSchema);

