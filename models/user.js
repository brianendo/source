var mongoose = require('mongoose');
var crypto = require('crypto');
var passportLocalMongoose = require('passport-local-mongoose');

// define the schema for our user model
var UserSchema = mongoose.Schema({

    email: String,
    password: String,
    firstname: String,
    lastname: String,
    username: String,
});

UserSchema.plugin(passportLocalMongoose);

// methods ======================
/**
 * Hook a pre save method to hash the password
 */
// UserSchema.pre('save', function(next) {
// 	if (this.password && this.password.length > 6) {
// 		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
// 		this.password = this.hashPassword(this.password);
// 	}

// 	next();
// });

// /**
//  * Create instance method for hashing a password
//  */
// UserSchema.methods.hashPassword = function(password) {
// 	if (this.salt && password) {
// 		return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
// 	} else {
// 		return password;
// 	}
// };

// /**
//  * Create instance method for authenticating user
//  */
// UserSchema.methods.authenticate = function(password) {
// 	return this.password === this.hashPassword(password);
// };
// // create the model for users and expose it to our app


module.exports = mongoose.model('User', UserSchema);

