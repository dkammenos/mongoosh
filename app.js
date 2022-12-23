//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

//Mongoose
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/todolistDB');
const Item = mongoose.model('Item', { name: String });
const defautItems=["marfia","tasia", "nikos"];
 //var mongoItems =[];
 //Item.find({name: /παιδ/},(err,items)=>{
Item.find((err,items)=>{
  if(err) {
      console.log(err);
  } else {
     // mongoose.connection.close();
      items.forEach(item => {
          console.log(item);
          workItems.push(item.name);
      });
        }
      });
  
 //mongoose.connection.close();
 

//Εισαγωγή εγγραφών

// const itemsArray = [
//   {name:"Να φάω φασολάδα"}, {name:"Μπυρούλα με τα παιδιά"},{name:"Παναιτωλικός - ΑΕΚ"}
// ];
//const item1 = new Item({name:"Να βρω χρήματα"});
//item1.save();

// Item.insertMany(itemsArray, function(err ) {
//   if (err) {
//     console.log(err)
//   } 
//     else {
//         console.log("ola enaxei")
//     } 
//   });

app.get("/", function(req, res) {

const day = date.getDate();

  //res.render("list", {listTitle: day, newListItems: defautItems});
  res.render("list", {listTitle: day, newListItems: workItems});

});

app.post("/", function(req, res){

  const item = req.body.newItem;
  const itemAdd = new Item({name:item});
    itemAdd.save();
    workItems.push(item);
    items.push(item);
    res.redirect("/");

  // if (req.body.list === "Work") {
  //   workItems.push(item);

  //   res.redirect("/work");
  // } else {
  //   items.push(item);
  //   res.redirect("/");
  // }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
