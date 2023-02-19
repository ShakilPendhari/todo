const express = require("express");

const app = express();
const cors = require("cors");
const { connection } = require("./config/db");
const { UserRoute } = require("./routes/user.routes");
const { TodoRoute } = require("./routes/todo.routes");
const { authenticate } = require("./middleware/middleware");
app.use(express.json());
const env = require("dotenv").config();
app.use(cors());
require("dotenv").config();

app.get("/",(req,res)=>{
    res.send("HOME PAGE");
})

app.use("/users",UserRoute);
app.use(authenticate);
app.use("/todo",TodoRoute)

app.listen(process.env.PORT, async ()=>{
    try{
       await connection;
       console.log("DB is connected to server");
    }
    catch(err){
        console.log("DB is not connected to server","Error",err.message);
    }
    console.log("Server is running at 8080");
});
 
