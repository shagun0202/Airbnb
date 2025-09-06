const express = require("express");
const router = express.Router();


//Index Route
router.get("/",(req,res)=> {
    res.send("GEt for users");
});
//Show - ussers
router.get("/:id",(req,res)=> {
    res.send("GEt for show users");
});
//Post- ussers
router.post("/",(req,res)=> {
    res.send("Post for show users");
});
//Delete - ussers
router.delete("/:id",(req,res)=> {
    res.send("Delete for show users");
});

module.exports = router;
