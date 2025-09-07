const express = require("express");
const router= express.Router();
const User =require("../models/user.js");
const wrapAsync=require("../utils/wrapAsync");
const passport=require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/user.js");

//renderSignup and signup
router
  .route("/signup")
  .get(userController.renderSignup)
  .post(wrapAsync(userController.signup));  

// //render signup
// router.get("/signup",userController.renderSignup);

// //signup
// router.post(
//     "/signup",
//     wrapAsync(userController.signup));  
    

//render login and login
router
  .route("/login")
  .get(userController.renderLoginForm) 
  .post( 
    saveRedirectUrl,
    passport.authenticate("local", { 
        failureRedirect:'/login', 
        failureFlash: true
    }),
    userController.login
   );



// //Render login
// router.get("/login",userController.renderLoginForm); 

// //login
// router.post(
//     "/login", 
//     saveRedirectUrl,
//     passport.authenticate("local", { 
//         failureRedirect:'/login', 
//         failureFlash: true
//     }),
//     userController.login
//    );



//logout
router.get("/logout",userController.logout)

module.exports=router;