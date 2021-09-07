const mongoose = require('mongoose');
const schema = mongoose.Schema;
// const Cube = require('./Cube')

const accessorySchema = schema({
  name: {
    type:String, 
  }, 
  description:{
    type:String, 
  }, 
  imageUrl:{
    type:String, 
  }, 
  Cubes:[{
    type: schema.Types.ObjectId, 
    ref:'Cube'
  }]
})


// accessorySchema.path('imageUrl').validate(function(){
//  let pattern = /^http(s)?\:\/\/.*/i;
//  return pattern.test(this.imageUrl)
// }, 'Must be a correct url') 

module.exports = mongoose.model('Accessory', accessorySchema)