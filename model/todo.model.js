const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    text:{type:String,required:true,unique:true},
    flag:{type:Boolean,required:true},
    user:String
});

const Todomodel = mongoose.model("todoData",todoSchema);

module.exports = {
    Todomodel,
}