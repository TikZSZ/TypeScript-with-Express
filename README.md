# This is a minified implementation of express-decorator

## This documentation covers
- [Getting Started](#get-started)
- [Basic Route Handler](#basic-route-handler)
- [Advance Route Handler](#advance-route-handler)
- [Custom middleware](#custom-middlewares)

## Note:  There is a working example included in `sample-example`

## Getting Started

First we need to create a index.ts file to instantiate Express and also import all of controllers file so that they can be included

```typescript
import express from "express";
import cookieSession from "cookie-session"
import {AppRouter} from "../decorators/AppRouter"
import "./LoginController"
import "./controllers/RootController"
import "./controllers/ProtectedController"

const app=express();

app.use(express.urlencoded({ extended:true}))
app.use(cookieSession({keys:["ladad"]}));
app.use(AppRouter.getInstance())


app.listen(3000,()=>{
  console.log("listening on port 3000");
})

```

## Basic Route Handler

Next we implement a root route controller
`@controller` decorator is used to prefix all routes and it is what that adds the routes to router `@GET(pathString) etc` can then use pathString which will be prefixed with `@controller` prefix 

So a `@controller("")` with `@GET("/")` would mean *`localhost:3000/`* with getMethod

```typescript
import { controller, GET } from "../decorators";
import {Request,Response} from "express";

@controller("")
class RootController{
  @GET("/")
  getRootRoute(req:Request,res:Response):void{
    if(req.session && req.session.isLoggedIn){
    res.send(`
    logged in
    <a href="/auth/logout">Logout</a>
    `)
    }else{
      res.send(`
      user not logged in
      <a href="/auth/login">Login</a>
      `)
    }
  }
}

```
## Advance Route Handler
 Next we can similarly implement rest of the routes giving the top level `@controller` a different prefix example `@controller("/auth")` with `@GET("/login")` which implies *`localhost:3000/auth/login`* as a getRequest

`@bodyValidator([keys]...)` can be used to check if a certain property was provided or not in body
```typescript
import {Request,Response} from "express"
import {GET,controller,POST,bodyValidator} from "../../decorators"

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
    res.redirect("/error")
  }

  @GET("/error")
  error(req:Request,res:Response){
    res.send(`
    <div>
      <p>
        Wrong credentials
      </p>
    </div>`)
  }
  

  @GET("/logout")
  logOut(req:Request,res:Response){
    req.session=undefined
    res.redirect("/")
  }
}

```
# Custom middlewares

It is possible to implement custom middleware logic and apply it as a decorator, export a function that takes express params like a middleware would and apply it on the route

```typescript
import {Middleware} from '../../decorators' 

function bodyValidator(keys:string[]):RequestHandler{
  return (req:Request, res:Response, next:NextFunction)=>{
    console.log(req.body);
    
    if(!req.body){
      res.status(422).send("invalid request")
      return
    }
    for (let key of keys){
      if(!req.body[key]){
        res.status(422).send(`missing property ${key}`)
        return
      }
    }
    next()
  }
}

@GET("/")
@Middleware(bodyValidator(['email','password']))
letLogin(req:RequestWithBody, res:Response){
  const {email,pass} = req.body
  if(email==="ad" && pass==="pass" && req.session){
    req.session ={isLoggedIn:true}
    console.log(req.session);
    res.redirect("/")
  }
  res.redirect("/error")
}



```