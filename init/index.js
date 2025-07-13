const express=require("express");
const app=express();
const Project=require("../models/Project.js");
const initData=require("./projectData.js");
const Client=require("../models/Client.js")
const initData2=require("./clientData.js")
const mongoose=require("mongoose");


main()
.then(()=>{
    console.log("connected to db");
    
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/landingpage');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// const initDb= async ()=>{
//    await Project.deleteMany({});
//    await Project.insertMany(initData.data);

//    console.log("data was initialized");
   
// }

const initDb= async ()=>{
   await Client.deleteMany({});
   await Client.insertMany(initData2.data2);

   console.log("data was initialized");
}

initDb();