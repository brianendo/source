var mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
    content: String,
    creator: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    created_at: {type: Date, default: Date.now},
    comments: [{type: mongoose.Schema.Types.ObjectId , ref: "Comment"}]
});


module.exports = mongoose.model('Post', PostSchema);