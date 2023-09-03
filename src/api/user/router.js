const express = require("express");
const router = express.Router();
// const jwt = require('jsonwebtoken');
const { authenticateToken } = require("../../token");
const controller = require("./controller");


// router.post("/apistest", controller.apisdata);
router.post('/signUp', controller.siginup)
router.post('/login', controller.login)
router.get('/userdata', authenticateToken, controller.userdata)
router.get('/getAllusers', controller.getAlluser)

router.post('/imageupload',controller.sendimage)
router.post('/file_Upload',controller.file_upload)
router.post("/logout",authenticateToken,controller.logout)
router.post("/forgot/password",controller.forgotPassword)
router.post("/update/forgot/password",controller.updateForgotPassword)

router.post("/anousment",controller.anousment)
router.get("/getAnousment",controller.getAnousment)
router.post("/updateAnousment/:id",controller.updateAnousment)
router.delete("/DeleteAnousment/:id",controller.DeleteAnousment)

/********************** Profile ****************************/
router.get("/get_profile",authenticateToken,controller.get_profile)
router.post("/updateProfile",authenticateToken,controller.updateProfile)






module.exports = router;

