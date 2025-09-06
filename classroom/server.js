const express = require("express");
const app = express();
const users = require("./routes/user.js");
const users = require("./routes/posts.js");



app.get("/",(req,res)=>{
    res.send("Hi,I am root!");
});

app.use("/users", users);
app.use("/posts", posts);



//Index Route
app.get("/posts",(req,res)=> {
    res.send("GEt for posts");
})
//Show - 
app.get("/posts/:id",(req,res)=> {
    res.send("GEt for posts users");
})
//Post- 
app.get("/posts/",(req,res)=> {
    res.send("Post for posts users");
})
//Delete - 
app.get("/posts/:id",(req,res)=> {
    res.send("Delete for posts users");
})



app.listen(3000,() => {
    console.log("server is listening to 3000");
});