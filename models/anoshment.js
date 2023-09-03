let mongoose = require('mongoose');
let anoshmentSchema = new mongoose.Schema({
    role:{type:Number}, // 1= 11,  2 = 12
    title:{type:String},
    description:{type:String}
},{
    timestamps:true
})

module.exports = mongoose.model("anoshment",anoshmentSchema)