const express = require("express");
const { Todomodel } = require("../model/todo.model");
const jwt = require("jsonwebtoken");

const TodoRoute = express.Router();

TodoRoute.get("/todo_get",async (req,res)=>{
    const payload = req.body;
    const token = req.headers.autorization;
    try{
         const todo = await Todomodel.find()
         res.send(todo);
        }
    catch(err){
        res.send({"msg":"Something went wrong","Error":err});
    }
})

TodoRoute.post("/create", async (req,res)=>{
    const payload = req.body
   const todo = new Todomodel(payload);
   await todo.save();
   res.send({"msg":"Todo Created"})
})

TodoRoute.delete("/delete/:id", async (req,res)=>{
    const todoID = req.params.id
    await Todomodel.findByIdAndDelete({_id:todoID})
    res.send("Todo item deleted")
})






module.exports = {
    TodoRoute
}