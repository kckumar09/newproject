const mongoose = require("mongoose")
const Schema = mongoose.Schema

let UserSchma = new Schema({
    name:String,
    role:Number, // 1= Student,  2 = teacher
    email:String,
    password:String,
    device_token:String,
    device_type:String,
    accessToken:String,
    phone:String,
    dob:Date,
    image:String,
    gender:{type:String,enum:["male","female"]}
},{
    timestamps:true
})


module.exports = mongoose.model('Users', UserSchma);
