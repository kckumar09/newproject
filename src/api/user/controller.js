const Model = require('../../../models/index')
// const db = require('../../../models/anoshment')
const helper = require("../../helper");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

module.exports = {


  siginup: async (req, res) => {
    try {
      let payload = req.body
      console.log(payload)
      
      const passdata = await bcrypt.hash(payload.password, 10);
      payload.password = passdata
      // payload.role = 1

      const userData = await Model.Users.findOne({ email: payload.email })

      if (userData) throw "Email Allready exist"
      const data = await Model.Users.create(payload)
      console.log('---dataa', data)
      await helper.success(res, "User Signup Seccessfully", data);
    } catch (error) {
      console.log(error)
      await helper.error(res, error);


    }
  },

  login: async (req, res) => {
    try {
      console.log("hereeeeeeeeeeeee")
      let payload = req.body
      const findata = await helper.userData(payload.email)
      if (!findata) throw "Please Enter Correct Email"

      const passdata = await bcrypt.compare(payload.password, findata.password)

      if (passdata == false) throw "Incorrect password"

      let authdata = {
        id: findata._id,
        email: findata.email
      }
      const Token = jwt.sign({ authdata }, "shhhhhhared-secret");

      // data.token = accessToken
      let data = await Model.Users.updateOne({ _id: findata._id }, { accessToken: Token })
      const userdata = await helper.userData(payload.email)
      if (userdata.role == 1) {
        console.log('student')
        await helper.success(res, "student login Seccessfully", userdata);
      } else {
        console.log('>>>>>>>>>>>>>>>teacher')
        await helper.success(res, "teacher login Seccessfully", userdata);

      }

    } catch (error) {
      console.log('--data', error)
      await helper.error(res, error)
    }
  },

  userdata: async (req, res) => {
    try {
      console.log(req.user.authdata)
      const data = await Model.Users.findById(req.user.authdata.id)
      await helper.success(res, "User Data get Seccessfully", data);
    } catch (error) {
      await helper.error(res, error)
    }

  },
  logout: async (req, res) => {
    let data = await Model.Users.updateOne({ _id: req.user.id }, { $set: { device_token: "" } })
    await helper.success(res, "Logout Seccessfully", {});
  },

  sendimage: async (req, res) => {
    try {
      let imageName = req.files.image.name;
      let img = req.files.image
      console.log(imageName);
      img.mv(`public/${imageName}`, err => {
        if (err) {
          return res.status(500).send(err);
        }
      })
      await helper.success(res, "Image Upload Successfully", {Link:imageName});
    } catch (error) {
      console.log('----errr', error)
      await helper.error(res, error)
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const userdata = await helper.userData(req.body.email)
      if (!userdata) {
        throw "Email not register with us"
      }
      let otp = Math.floor(1000 + Math.random() * 9000);
      await helper.success(res, "Otp sent Successfully", {otp});
    } catch (error) {
      console.log('----errr', error)
      await helper.error(res, error)
    }
  },
  updateForgotPassword: async (req, res) => {
    try {
      const passdata = await bcrypt.hash(req.body.password, 10);
      let data = await Model.Users.updateOne({ email: req.body.email }, { $set: { password: passdata } })
      await helper.success(res, "password changed Successfully", {});
    } catch (error) {
      console.log('----errr', error)
      await helper.error(res, error)
    }
  },


  file_upload: async (req, res) => {
    try {
      console.log(req.files.image.length, ">>>>>>>>>>>..;lenth")



    } catch (error) {
      console.log(error, "error>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
      await helper.error(res, error)
    }
  },
  anousment: async( req, res) => {
    // console.log(req.body,"HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH");return
    try {
      let create_data = await Model.anoshment.create(req.body)
        await helper.success(res,"Anushment create successfully",create_data)
    } catch (error) {
      await helper.error(res,error)
    }
  },

 getAnousment: async( req, res) => {
    try {
      let get_data = await Model.anoshment.find()
        await helper.success(res,"Anushment create successfully",get_data)
    } catch (error) {
      await helper.error(res,error)
    }
  },
  updateAnousment: async( req, res) => {
    try {
      let getid = req.params.id
      let get_data = await Model.anoshment.updateOne({_id:getid},req.body)
        await helper.success(res,"Anushment create successfully",get_data)
    } catch (error) {
      await helper.error(res,error)
    }
  },
  DeleteAnousment: async( req, res) => {
    try {
      let getid = req.params.id
      let delete_data = await Model.anoshment.deleteOne({_id:getid},req.body)
        await helper.success(res,"Anushment create successfully",delete_data)
    } catch (error) {
      await helper.error(res,error)
    }
  },

  /**************************** Profile ***************************/

  get_profile:async(req,res)=>{
    // console.log(req.user.id,"HHHHHHHHHHHHHHHHHHHHHHHH");return
    try {
      let profileData = await Model.Users.findOne({_id:req.user.authdata.id})
      await helper.success(res,"get successfully",profileData)
    } catch (error) {
      await helper.error(res,error)
    }
  },
  updateProfile:async(req,res)=>{
    try {
      let userid = req.user.authdata.id
      let profileData = await Model.Users.findByIdAndUpdate(userid,req.body,{new:true})
      if(!profileData){
       return await helper.error(res,"data not found",)
      }
      // console.log(profileData)
      return await helper.success(res,"get successfully",profileData)
    } catch (error) {
      await helper.error(res,error)
    }
  },
  getAlluser:async(req,res)=>{
    try {
      let userdata = await Model.Users.find()
      await helper.success(res,"get all users successfully",userdata)
    } catch (error) {
      
    }
  }
};
