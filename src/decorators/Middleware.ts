import {  RequestHandler } from "express";
import "reflect-metadata";
import { AppRouter } from "./AppRouter";
import { MetadataKeys } from "./MetadataKeys";

let router = AppRouter.getInstance();


interface PropertyDescriptorWithRequestHandler extends PropertyDescriptor{
  value?:RequestHandler
}

export function Middleware(middlewareFunction:RequestHandler){
  return (target:any,key:string,desc:PropertyDescriptorWithRequestHandler)=>{
    Reflect.defineMetadata(MetadataKeys.middleware, middlewareFunction, target,key)
  }
}