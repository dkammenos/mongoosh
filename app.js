const express = require("express");
const https = require("https");
//const bodyParser = require("body-parser");
const bodyParser = require("body-parser");
const app = express();


const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/shopDB');
// const schema = new mongoose.Schema({ name: 'string', size: 'string' });
// const Tank = mongoose.model('Tank', schema);
// const tank = new Tank({name:"dennis",size:"Big"});
// tank.save();

const productSchema = new mongoose.Schema({
    name:'string',
    color:'array',
    price:'number',
    stock:'number'
});
const Product = mongoose.model("Product", productSchema);
const product = new Product({
    name:"Pencil",
    color:["Red","Blue","Yellow"],
    price:12,
    stock:14  
});
product.save().then(()=>console.log("Object inserted"));

const User = mongoose.model("User",{name:'string',ename:'string',age:'number'}); //Μπορεί να δηλωθεί και το σχήμα απ'ευθείας στο μοντέλο
const nionios = new User({name:"Nionos",ename:"kammenos",age:22});
const nikos = new User({name:"Nikos",ename:"kammenos",age:13});
const takis = new User({name:"Takis",ename:"kammenos",age:34});
const maria = new User({name:"Mar;ia",ename:"kammenos",age:78});
User.insertMany([nionios,nikos,takis,maria],(err)=>{
    if(err){
        console.log(err);
    } else {
        console.log("Olew oi eggrafew einai etoimeis")
    }
})
// nionios.save().then(()=>console.log("User inserted"));
// const Cat = mongoose.model('Cat', { name: String });
// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));


// product.save();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",(req,res)=>{
     res.sendFile(__dirname+"/index.html");
});
app.listen(3000, () => {
    console.log("the server is started at port 3000");
    });