var mongoose = require('mongoose');

var MessageSchema = mongoose.Schema({
    content: String,
    creator: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    created_at: {type: Date, default: Date.now},
});


module.exports = mongoose.model('Message', MessageSchema);