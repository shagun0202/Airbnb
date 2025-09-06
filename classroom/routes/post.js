const express = require("express");
const router = express.Router();




//Index Route
router.get("/",(req,res)=> {
    res.send("GEt for posts");
});
//Show - 
router.get("/:id",(req,res)=> {
    res.send("GEt for posts users");
});
//Post- 
router.post("/",(req,res)=> {
    res.send("Post for posts users");
});
//Delete - 
router.delete("/:id",(req,res) => {
    res.send("Delete for posts users");
});

module.exports = router;
