const express = require ("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");

const listinds = require("./routes/listing.js");


const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

main()
   .then(() => {
    console.log("connected to DB");
   })
   .catch((err) => {
    console.log(err);
   });

async function main(){
    await mongoose.connect(MONGO_URL); 
};

app.set("view engine","ejs");
app.set("views",path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


app.get("/",(req,res)=>{
    res.send("Hi, I am root");
});


const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body.listing);
  if (error) {
    throw new ExpressError(400, error.details.map(el => el.message).join(","));
  } else {
    next();
  }
}

app.use("/listings" , listing);





//Reviews 
//POST Review Route
app.post("/listings/:id/reviews" , validateReview, wrapAsync(async(req, res)=>{
        let listing = await Listing.findById(req.params.id);
        let newReview = new Review(req.body.review);
        listing.reviews.push(newReview);
        await newReview.save();
        await listing.save();
       
        res.redirect(`/listings/${listing._id}`);

        
           
}));
//Delete REview Route
app.delete("/listings/:id/reviews/:reviewID", wrapAsync(async(req, res) => {
  let { id, reviewID } = req.params; // <-- yahan bada D
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewID } });
  await Review.findByIdAndDelete(reviewID);
  res.redirect(`/listings/${id}`);
}));





// app.get("/testListing" , async (req, res) => {
//     let sampleListing = new Listing ({
//         title: "desirable dest",
//         description: "on the  way to Greece",
//         price:50000,
//         location:"Athens ",
//         Country: "Greece",
        
//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");

// });

// 404 handler (yeh error handler ke UPPAR hona chahiye)
// app.all("*", (req, res, next) => {
//     next(new ExpressError(404, "Page not found!"));
// });

// Error handler (yeh sabse last me hona chahiye)
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Something went wrong!";
    res.status(statusCode).render("error", { message: err.message });
});





app.listen(8080, () => {
    console.log ("server is listening to port 8080 ");
});