// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var logger = require("morgan");
var bodyParser = require('body-parser');
// var request = require('request');
var path = require('path');

var PORT = process.env.PORT || 3001;
var app = express();

// Set the app up with morgan
app.use(logger("dev"));

app.use(bodyParser());

// Database configuration
var databaseUrl = process.env.MONGODB_URI || "jokes_db";
var collections = ["jokes"];

// Hook mongojs config to db variable
var db = mongojs(databaseUrl , collections);

// Log any mongojs errors to console
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

  //allow the api to be accessed by other apps
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    next();
  });



  app.get("/jokes", function(req, res) {
    // Grab every doc in the Articles array
      db.jokes.find({}, function(error, jokes) {
        // Log any errors
        if (error) {
          console.log(error);
        }
        // Or send the doc to the browser as a json object
        else {
          res.json(jokes);
        }
    });
  });

  // Handle form submission, save submission to mongo
  app.post("/create", function(req, res) {
    console.log("hit route")
    
    // Insert the song into the songs collection
    db.jokes.insert(req.body, function(error, savedJokes) {
      // Log any errors
      if (error) {
        console.log(error);
      }else {
        //the reason why we are sending the savedJokes back is because we now have an _id to give to the client
        res.json(savedJokes);
        console.log("route hit");
      }
    });
  });

  app.get("/jokes/:id/vote_up", function (req, res){
    // res.send("dhdhdh")
    // res.send('hi')
    db.jokes.update({
        _id: req.params.id
      },
      { $inc: {vote_up: 1} }
      , function (err, editedJoke) {
        if (err) {
         res.json(err); 
        } else {
          res.json(editedJoke);
        }
      })
   });


// db.jokes.findAndModify({
//       query: {
//         _id: "590bee211f7c1fa39c959602"
//       },
//       update: { $inc: {vote_up: 1} },
//       upsert: true,
//       new: true,
//       })
  
  


  // //one song
  // app.get("/songs/:id", function(req, res) {
  //   db.songs.findOne({
  //     "_id": mongojs.ObjectId(req.params.id)
  //   }, function(error, oneSong) {
  //     if (error) {
  //       res.send(error);
  //     }else {
  //       res.json(oneSong);
  //     }
  //   });
  // });

//   //update a song
//   app.put("/songs/:id", function(req, res) {
//     //if we use this then we won't get the updated document back
//     /* 
//       db.songs.update({
//         "_id": mongojs.ObjectId(req.params.id)
//       }, {
//         $set: {
//           "artist": req.body.artist,
//           "songName": req.body.songName
//         }
//       }, function(error, editedSong) {
//         if (error) {
//           res.send(error);
//         }else {
//           res.json(editedSong);
//         }
//       });
//     */

//     db.songs.findAndModify({
//       query: { 
//         "_id": mongojs.ObjectId(req.params.id) 
//       },
//       update: { $set: {
//         "artist": req.body.artist, "songName": req.body.songName } 
//       },
//       new: true
//       }, function (err, editedSong) {
//           res.json(editedSong);
//       });
//   });

// //up to 8:59 explain with your partners
//   app.put("/songs/votes/:id/:direction", function(req, res){

//     var voteChange = 0;

//     if (req.params.direction == 'up') voteChange = 1;
//     else voteChange = -1; 

//     //this is wrong I want to grab the current votes and increment by 1
//     db.songs.findAndModify({
//       query: { 
//         "_id": mongojs.ObjectId(req.params.id) 
//       },
//       update: { $inc: { votes: voteChange} },  
//       new: true
//       }, function (err, editedSong) {
//           res.json(editedSong);
//       });
//   });

  app.get('/form', function(req, res) {
    res.sendFile(path.join(__dirname, './index.html'));
  });

// Listen on port 3001
  app.listen(PORT, function() {
    console.log('🌎 ==> Now listening on PORT %s! Visit http://localhost:%s in your browser!', PORT, PORT);
  });