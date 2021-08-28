import { controller, GET } from "../../decorators";
import { Request, Response } from "express";

@controller("")
class RootController {
  @GET("/")
  getRootRoute(req: Request, res: Response): void {
    if (req.session && req.session.isLoggedIn) {
      res.send(`
    logged in
    <a href="/auth/logout">Logout</a>
    `);
    } else {
      res.send(`
      user not logged in
      <a href="/auth/login">Login</a>
      `);
    }
  }
}
