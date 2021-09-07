const mongoose = require('mongoose');
const schema = mongoose.Schema;
// const Accessory = require('./Accessory')

const userSchema = schema({
  username: {
    type:String, 
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20
  }, 
  password:{
    type:String, 
    required: true,
    minlength: 3,
    maxlength: 200
  },
  email:{
    type:String,
    required: true,
    minlength: 6,
    maxlength: 200
  }
 


});



const User = mongoose.model('User', userSchema);
module.exports = User;