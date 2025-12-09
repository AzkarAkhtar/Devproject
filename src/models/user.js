const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({

    firstName:{
        type : String,
        required : true,
        minlength : 4,
        maxlength : 20,
    },
    lastName :{
        type : String,
    },
    age : {
        type : Number,
        min : 18,
    },

    emailId: {
        
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
        if (!validator.isEmail(value)) {
            throw new Error("Invalid Email ID");
             }
        }
    },

    password : {
        type : String,
        required : true,
        validate(value) {
            if(!validator.isStrongPassword(value)) {
                throw new Error("Password is not strong enough");
            }
        }
    },
    photoUrl : {
        type : String,
        validate(value) {
            if(!validator.isURL(value)) {
                throw new Error("Invalid URL");
            }
        }

    },
    skills : {
        type : [String],
        default : ["User is Skillful"],
    },
    gender : {
        type : String,
    },

}, {timestamps : true});

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, process.env.JWT_secret, {
    expiresIn: "7d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );

  return isPasswordValid;
};

module.exports = mongoose.model("User",userSchema);