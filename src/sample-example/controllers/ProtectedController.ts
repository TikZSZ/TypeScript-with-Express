import { controller, GET, use } from "../../decorators";
import {Request,Response,NextFunction} from "express";
function requireAuth(req: Request,res: Response,next: NextFunction){
  if(req.session && req.session.isLoggedIn){
    next();
    return
  }
  res.status(403)
  res.send("not permitted")
}

@controller("")
class RootController{

  @GET("/protected")
  @use(requireAuth)
  getProtectedRoute(req:Request,res:Response){
    res.send("welcome to protected router logged in user");
  }
}