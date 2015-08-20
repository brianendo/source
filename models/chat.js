var mongoose = require('mongoose');

var ChatSchema = mongoose.Schema({
    title: {type:mongoose.Schema.Types.ObjectId, ref: "Post"},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    created_at: {type: Date, default: Date.now},
    messages: [{type: mongoose.Schema.Types.ObjectId , ref: "Message"}]
});


module.exports = mongoose.model('Chat', ChatSchema);