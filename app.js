

const express=require("express");
const app=express();
const mongoose=require("mongoose");

const Project = require("./models/Project.js");
const Client = require("./models/Client.js");
const Contact = require("./models/Contact.js");
const Subscription=require("./models/Subscription.js")


const path = require("path");

// Set the view engine to EJS
app.set("view engine", "ejs");

// Set the views folder
app.set("views", path.join(__dirname, "views"));

// Set the public folder for static files like CSS
app.use(express.static(path.join(__dirname, "/public")));

const dbUrl=process.env.ATLAS_URL;
main()
.then(()=>{
    console.log("connected to db");
    
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/landingpage");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


// app.get("/testListing",async(req,res)=>{
//     let sample=new Project({
//         image:"./photo/young-couple-examining-blueprints-with-real-estate-agent-while-buying-new-home 1.svg",
//         name:"Design",
//         description:"make a home design"

//     })
//    await sample.save();
//    console.log("sample was saved",sample);
//    res.send("data saved in db");

// });

app.get("/",(req,res)=>{
    res.send("i am root");
})

app.get("/landing",async(req,res)=>{
      const projects = await Project.find({});
      const clients=await Client.find({});
    //   console.log(clients)
      res.render("index", { projects ,clients});
   
})


app.use("/admin", (req, res, next) => {
    let { token } = req.query;
    if (token === "giveaccess") {
        return next();  // Important!
    } 
    res.send("ACCESS DENIED!");
});

app.get("/admin", async (req, res) => {
    try {
        const projects = await Project.find({});
        const clients = await Client.find({});
        const contacts = await Contact.find({});
        const subscribers = await Subscription.find({});

        res.render("admin", { projects, clients, contacts, subscribers });
    } catch (err) {
        console.error("Error fetching admin data:", err);
        res.status(500).send("Something went wrong.");
    }
});



app.listen(5000,()=>{
    console.log(`server listen on port 5000`);
    
})