const express = require('express');
const router = express.Router();
const User = require('../models/user');
const session = require('express-session');
const passport = require('passport');

const passportlocalmongoose = require('passport-local-mongoose');
const { default: Wishlist } = require('../../my-app/src/Pages/Wishlist');
let name = "";

router.use(session({
  secret:"Sahil Sanjeev Kulkarni",
  resave:false,
  saveUninitialized:false
}));


router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, {
        id: user.id,
        username: user.username,
        picture: user.picture
      });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

  router.post("/register",(req,res)=>{
    User.register({username:req.body.username,email:req.body.email,name:req.body.name},req.body.password,function(err,user){
      if(err){
        console.log(err);
      }else{
        passport.authenticate("local")(req,res,function(){
          res.json({message:"Authentication Successful"});
        })
      }
    })
  });
 

  router.post("/login",async(req,res)=>{
    name  = req.body.username;
    const newuser = new User({
      username:req.body.username,
      password:req.body.password
    });
   
    
      
    
  
    req.login(newuser,function(err){
      if(err){
        console.log(err);
      }else{
        passport.authenticate("local")(req,res,function(){
          router.get("/login",async(req,res)=>{
   
            const user = await User.findOne({username:name});
            console.log(user.name);
            res.send(user.name);
          });
          // req.session.name = newuser.name
          res.send("Congrats You have your account");
         
        
        });
      }
    });

  });

  // router.get("/wishlist",async(req,res)=>{
  //   const userId = await User.findOne({username:name});
  //   console.log(userId._id);
  //   res.send(userId._id);
  // })
 
  const axios = require('axios');

const app = express();

router.get('/results', async (req, res) => {
  try {
    const response = await axios.get('https://exam.msrit.edu/index.php');
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve data' });
  }
});

// a.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });




  
module.exports = router;



