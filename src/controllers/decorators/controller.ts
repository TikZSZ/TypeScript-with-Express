import { NextFunction, Request, RequestHandler, Response } from "express";
import "reflect-metadata";
import { AppRouter } from "../../AppRouter";
import { Methods } from "./Methods";
import { MetadataKeys } from "./MetadataKeys";

let router = AppRouter.getInstance();

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

export function controller(routePrefix: string) {
  return (target: Function) => {
    for (let key in target.prototype) {
      const routeHanlder = target.prototype[key];
      const path = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype,
        key
      );
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      );

      let middilewares: RequestHandler[] =
        Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
        [];
      
      let bodyValidators:string[]=Reflect.getMetadata(MetadataKeys.bodyValidators, target.prototype,key) || []
  
      const validator = bodyValidator(bodyValidators)

      if (path) {
        router[method](`${routePrefix}${path}`, ...middilewares,validator, routeHanlder);
      }
    }
  };
}

export { router };
