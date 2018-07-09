var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Clouds Rest", 
        image: "https://farm7.staticflickr.com/6089/6094103869_d53a990c83.jpg",
        description: "Bacon ipsum dolor amet bacon flank pancetta, pig meatball jerky pork belly pork chop ball tip beef ribs. Ham short ribs salami capicola frankfurter spare ribs short loin turducken hamburger corned beef turkey landjaeger alcatra chicken. Pastrami ball tip jerky, meatloaf kielbasa buffalo boudin rump venison jowl tail pork swine. Pancetta alcatra leberkas cow shoulder shank pig hamburger burgdoggen meatloaf. Jowl flank pork salami landjaeger shankle. Burgdoggen kielbasa jerky corned beef. Turkey picanha prosciutto fatback tri-tip chicken sirloin."
    },
    {
        name: "Another campground", 
        image: "https://farm3.staticflickr.com/2580/3942698066_9157ac5123.jpg",
        description: "Bacon ipsum dolor amet bacon flank pancetta, pig meatball jerky pork belly pork chop ball tip beef ribs. Ham short ribs salami capicola frankfurter spare ribs short loin turducken hamburger corned beef turkey landjaeger alcatra chicken. Pastrami ball tip jerky, meatloaf kielbasa buffalo boudin rump venison jowl tail pork swine. Pancetta alcatra leberkas cow shoulder shank pig hamburger burgdoggen meatloaf. Jowl flank pork salami landjaeger shankle. Burgdoggen kielbasa jerky corned beef. Turkey picanha prosciutto fatback tri-tip chicken sirloin."
    },
    {
        name: "Canyon Floor", 
        image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg",
        description: "Bacon ipsum dolor amet bacon flank pancetta, pig meatball jerky pork belly pork chop ball tip beef ribs. Ham short ribs salami capicola frankfurter spare ribs short loin turducken hamburger corned beef turkey landjaeger alcatra chicken. Pastrami ball tip jerky, meatloaf kielbasa buffalo boudin rump venison jowl tail pork swine. Pancetta alcatra leberkas cow shoulder shank pig hamburger burgdoggen meatloaf. Jowl flank pork salami landjaeger shankle. Burgdoggen kielbasa jerky corned beef. Turkey picanha prosciutto fatback tri-tip chicken sirloin."
    }
];


function seedDB() {
    // Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!")
        // add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                     if(err){
                        console.log(err);
                    } else {
                         console.log("added a campground");
                         //create a comment 
                         Comment.create(
                             {
                                 text: "This place is great but i wish there was internet",
                                 author: "Homer"
                             }, function(err, comment){
                                 if(err){
                                     console.log(err);
                                 } else {
                                     campground.comments.push(comment);
                                     campground.save();
                                     console.log("Created new comment");
                                 }
                             });
                }
            });
        });
    });
    
 
    // add a few comments
};

module.exports = seedDB;