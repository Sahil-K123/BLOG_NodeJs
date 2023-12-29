const mongoose = require('mongoose')
const { createHmac, randomBytes } = require('node:crypto');
const { createTokenForUser } = require('../services/auth');


const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
        // required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImageURL: {
        type: String,
        default: '/images/default.png',
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    },
},{
    timestamps: true  
})

userSchema.pre('save', function (next) {
    const user = this; // this -> current user

    if(!user.isModified('password')) return ;

    const salt = randomBytes(16).toString();
    // const salt = "somerandomsalt";
    const hashedPassword = createHmac('sha256', salt).update(user.password).digest("hex");
    this.salt = salt;
    this.password = hashedPassword;

    next();

})

userSchema.static('matchPasswordAndGenerateToken', async function( email, password){
    // this: mongoose.Model<any, any, any, any, any, any>
    const user = await this.findOne( { email } )
    // console.log(user);
    if(!user) throw new Error('User not found!');


    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac('sha256', salt).update(password).digest("hex")
    
    if(hashedPassword !== userProvidedHash) throw new Error('Incorrect Password')

    const token = createTokenForUser(user)
    return token

})

const User = mongoose.model('user', userSchema);

module.exports = User


