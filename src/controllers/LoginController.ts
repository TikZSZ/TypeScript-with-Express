
import {NextFunction, Request,Response} from "express"
import {GET , controller, use,POST,bodyValidator} from "./decorators"

interface RequestWithBody extends Request{
  body:{[key: string]:string|undefined}
}


@controller("/auth")
 export class LoginController {

  @GET("/login")
  getLogin(req:Request,res:Response){
    res.send(`
  <form method="POST">
  <div>
    <label for="">Email</label>
    <input type="text" name="email">
  </div>
  <div>
    <label for="">password</label>
    <input type="password" name="pass">
  </div>
  <button type="submit">Submit</button>
  </form>
  `)
  }

  @POST("/login")
  @bodyValidator("email","pass")
  letLogin(req:RequestWithBody, res:Response){
    const {email,pass} = req.body
    if(email==="ad" && pass==="pass" && req.session){
      req.session ={isLoggedIn:true}
      console.log(req.session);
      res.redirect("/")
    }
  }

  @GET("/logout")
  logOut(req:Request,res:Response){
    req.session=undefined
    res.redirect("/")
  }
  
}
