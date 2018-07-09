var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    Campground      = require("./models/campground"),
    seedDB          = require("./seeds"),
    flash           = require("connect-flash"),
    Comment         = require("./models/comment"),
    passport        = require("passport"),
    methodOverride  = require("method-override"),
    LocalStrategy   = require("passport-local"),
    User            = require("./models/user"),
    mongoose        = require("mongoose");

// requiring routes
var commentRoutes   = require("./routes/comments"),
    campgroundRoutes= require("./routes/campgrounds"),
    indexRoutes     = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//seedDB(); //see the database

//PASSPORT CONFIG 

app.use(require("express-session")({
    secret: "Flo was the best dog ever",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

/*Campground.create(
    {
        name: "Granite Hill", 
        image: "https://farm7.staticflickr.com/6188/6208181463_40c4fd7049.jpg",
        description: "This is a huge granite hill, no bathrooms. No water. Beautiful granite!"
        
    }, function(err, campground){
        if(err){
            console.log(err);
        } else {
            console.log("Newly created campground: ");
            console.log(campground);
        }
    });*/


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YelpCamp Server Has Started!"); 
});