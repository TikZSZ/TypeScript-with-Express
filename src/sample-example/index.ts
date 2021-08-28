import express from "express";
import cookieSession from "cookie-session"
import {AppRouter} from "../decorators/AppRouter"
import "./controllers/LoginController"
import "./controllers/RootController"
import "./controllers/ProtectedController"

const app=express();

app.use(express.urlencoded({ extended:true}))
app.use(cookieSession({keys:["ladad"]}));

// import the common router instance from module because its being used to add routes internally
app.use(AppRouter.getInstance())


app.listen(3000,()=>{
  console.log("listening on port 3000");
})