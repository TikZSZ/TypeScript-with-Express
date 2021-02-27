import express,{Request,Response} from "express";
import cookieSession from "cookie-session"
import {AppRouter} from "./AppRouter"
import "./controllers/LoginController"
import "./controllers/RootController"
import "./controllers/ProtectedController"

const app=express();

app.use(express.urlencoded({ extended:true}))
app.use(cookieSession({keys:["ladad"]}));
app.use(AppRouter.getInstance())


app.listen(3000,()=>{
  console.log("listening on port 3000");
})