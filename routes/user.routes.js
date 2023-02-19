const express = require("express");
const jwt = require("jsonwebtoken");
const { Usermodel } = require("../model/user.model");
const bcrypt = require("bcrypt");

const UserRoute = express.Router();

UserRoute.post("/register", (req,res)=>{
    const {email,name,pass} = req.body;
    try{
        bcrypt.hash(pass, 5, async(err, hash)=> {
            if(err)  res.send({"msg":"Something went wrong","Error":err});
            else {
                const user = new Usermodel({name,email,pass:hash});
                await user.save();
                res.send({"msg":"User has been registered Successfully!"});
            }
        });
       
    }
    catch(err){
        res.send({"msg":"Something went wrong","Error":err});
    }
})

UserRoute.post("/login", async (req,res)=>{
    const {email,pass} = req.body;
    
       try{
       
          const userLogin = await Usermodel.find({email});
          
          if(userLogin.length>0)
          {
            bcrypt.compare(pass,userLogin[0].pass, (err, result)=> {
                if(result) {
                    const token = jwt.sign({userID:user[0]._id},"todo",{
                        expiresIn:"1h"
                    })
                    res.send({"msg":"Congratulations! Login Successful","token":token});
                }
                else{
                    res.send({"msg":"Something went wrong","Error":err});
                }
            });
          }
       }
       catch(err){
        res.send("Wrong credentials");
       }
});

module.exports = {
    UserRoute
}