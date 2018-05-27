// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routers
// =============================================================
app.get("/", function(req, res) {
   res.sendFile(path.join(__dirname, "/app/public/home.html"));
 });

// Sets up Variables
// =============================================================
var compArr=[]

var arrFriends=[
  { '1': '2',
  '2': '3',
  '3': '4',
  '4': '1',
  '5': '2',
  '6': '2',
  '7': '5',
  '8': '5',
  '9': '1',
  '10': '1',
  Wholename: 'Abid Abdelaziz',
  photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/2010-brown-bear.jpg/400px-2010-brown-bear.jpg' },
  { '1': '2',
  '2': '3',
  '3': '1',
  '4': '1',
  '5': '5',
  '6': '2',
  '7': '2',
  '8': '5',
  '9': '1',
  '10': '1',
  Wholename: 'Erika Matsumoto',
  photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Jelly_cc11.jpg/440px-Jelly_cc11.jpg' },
  { '1': '4',
  '2': '5',
  '3': '1',
  '4': '1',
  '5': '5',
  '6': '2',
  '7': '2',
  '8': '5',
  '9': '4',
  '10': '1',
  Wholename: 'Raven Wills',
  photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Head_of_Raven.jpg/440px-Head_of_Raven.jpg' },
  { '1': '4',
  '2': '2',
  '3': '4',
  '4': '1',
  '5': '5',
  '6': '2',
  '7': '5',
  '8': '1',
  '9': '4',
  '10': '1',
  Wholename: 'Kevin Pena',
  photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Green_Sea_Turtle_grazing_seagrass.jpg/440px-Green_Sea_Turtle_grazing_seagrass.jpg' } 
];


// Create New Friends - takes in JSON input
app.post("/send/friend", function(req, res) {
    var newfriend = req.body;
    arrFriends.push(newfriend);
    res.json(newfriend);
  });


app.get("/find/friend", function(req,res){

    // Deep Clone of Data
    arrFriendsClone= arrFriends.map(a => ({...a}))
    // Change Nested Objects to Nested Arrays
    arrFriendsClone= arrFriendsClone.map(a=>Object.values(a))
    userName= req.query.Wholename.trim()
    var arrUser
    for (i = arrFriends.length-1; i >=0 ; i--) {
      if (userName === arrFriendsClone[i][10]) {
        arrUser= arrFriendsClone.splice(i,1)[0]
      }
    }
    for ( i = 0;i < arrFriendsClone.length; i++){
      var tempArr=[];
        for (j = 0; j<10 ; j++){
        
          tempArr.push(Math.abs(parseInt(arrUser[j])-parseInt(arrFriendsClone[i][j])))
        }

        compArr.push([tempArr.reduce((acc,x)=>acc+x),arrFriendsClone[i][10], arrFriendsClone[i][11]])
    }
  compArr.sort((a,b)=>a[0]-b[0])
  res.sendFile(path.join(__dirname, "/app/public/survey.html"))
  console.log(compArr)
})

app.get("/get/friend", function(req,res){


        return res.json(compArr)

})



  
  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });



  //Code