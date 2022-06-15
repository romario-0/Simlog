const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    firstName : String,
    lastName : String,
    age : String,
    nationality : String,
    username : String,
    password :  {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    },
},
{
    timestamps: true
});

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function(username, password){
    const user = await this.findOne({ username : username});
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }else{
            throw Error("Incorrect password");
        }
    }else{
        throw Error("Username not found");
    }
}

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;