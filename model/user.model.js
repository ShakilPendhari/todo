const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    pass:{type:String,required:true},
});


const Usermodel = mongoose.model("todo",userSchema);


module.exports = {
    Usermodel
}