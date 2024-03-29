const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const methodOverride = require("method-override");
const path = require("path");
const { isLoggedIn, isOwner, validateReview,validateListing, isReviewAuthor} = require("../middleware.js")
const listingController = require("../controllers/listings.js");
const reviewController = require("../controllers/review.js");
const multer = require("multer");
const {storage} = require("../cloudconfig.js");
const upload = multer({storage});

router.route("/").
    get(wrapAsync(listingController.index)).
    post(isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync( listingController.createListing));


  router.use(express.urlencoded({ extended: true }));
  router.use(methodOverride("_method"));
  router.use(express.static(path.join(__dirname, "/public")));


  //New Route
  router.get("/new", isLoggedIn , listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,  upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn, isOwner,wrapAsync(listingController.destroyListing));

//Edit Route
router.get("/:id/edit" ,isLoggedIn, isOwner,wrapAsync( listingController.renderEditForm));

  //Reviews//
//Post review Route
router.post("/:id/reviews", isLoggedIn, validateReview, wrapAsync(reviewController.createReview ));

//delete review Route
router.delete("/:id/reviews/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;

