const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add name"],
    },
    email: {
        type: String,
        required: [true, "Please add email"],
    },
    password: {
        type: String,
        required: [true, "Please add password"],
        minlength: [8, "Password must be at least 8 characters long"],
        select: false,
    },
    avatar: {
        type: String,
        default: "",
    },
    about: {
        type: String,
        default: "",
    },
    createdAt: {
    type: Date,
    default: Date.now,
  },
});

//Encrypt password using bcrypt
UserSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

//sign jwt and return it
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, config.get('jwtSecret'), {
    expiresIn: config.get('jwtExpire'),
  });
};

//match user password to hashed password in db
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};



module.exports = User = mongoose.model('user', UserSchema);
