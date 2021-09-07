const mongoose = require('mongoose');
const schema = mongoose.Schema;
// const Accessory = require('./Accessory')

const cubeSchema = schema({
  name: {
    type:String, 
  
  }, 
  description:{
    type:String, 
  
  }, 
  imageUrl:{
    type:String, 
  
  }, 
  difficultyLevel:{
    type:Number, 
  
    min:1, 
    max:6
  }, 
  accessories:[{
    type: schema.Types.ObjectId, 
    ref:'Accessory'
  }]
})


// cubeSchema.path('imageURL').validate(function(){
//   let pattern = /^http(s)?\:\/\/.*/i;
//   return pattern.test(this.imageURL)
// }, 'Must be a correct url')

module.exports = mongoose.model('Cube', cubeSchema)

























// const mongoose = require('mongoose');
// const schema = mongoose.Schema;
// // const Accessory = require('./Accessory')

// const cubeSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   imageURL: String,
//   difficultyLevel: Number
// });

// // Declare Cube to instantiate mongoose.model
// const Cube = mongoose.model('Cube', cubeSchema);

// module.exports = mongoose.model('Cube', cubeSchema)
