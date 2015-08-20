var mongoose = require('mongoose');

var CommentSchema = mongoose.Schema({
    content: String,
    creator: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    created_at: {type: Date, default: Date.now}
});


module.exports = mongoose.model('Comment', CommentSchema);