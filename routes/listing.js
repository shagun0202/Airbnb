const express = require("express");
const router =  express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");





const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body.listing);
  if (error) {
    throw new ExpressError(400, error.details.map(el => el.message).join(","));
  } else {
    next();
  }
};


//Index Route
router.get("/", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listing/index", { allListings });
});

//new Route
router.get("/new",(req,res)=>{
    res.render("listing/new");
});

//Show Route
router.get("/:id" , wrapAsync(async (req, res) => {
      let {id} = req.params;
      const listing = await Listing.findById(id).populate("reviews");
      res.render("listing/show", {listing});
}));

//Create Route
router.post("/", validateListing, async (req, res) => {
    
    
    const newListing = new Listing(req.body.listing);
    
    await newListing.save();
    res.redirect("/listing");
 
   });

//Edit Route
router.get("/:id/edit", wrapAsync(async(req,res)=> {
    let {id} = req.params;
    id = id.trim(); // Trim any spaces
    const listing = await Listing.findById(id);
    res.render("listing/edit", {listing});  
}));

//Update Route
router.put("/:id", validateListing , wrapAsync(async(req,res)=> {
        
    
    let {id} = req.params;
    id = id.trim(); // Trim any spaces
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect("/listing");  


}));


//Delete Route
router.delete("/listing/:id", wrapAsync(async(req,res)=> {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listing");  


}));


module.exports = router;