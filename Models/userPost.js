const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const formatDate = require("../Helpers/formatDate");


const postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: formatDate(new Date)
    }
});

const Post = module.exports = mongoose.model("Post", postSchema);
