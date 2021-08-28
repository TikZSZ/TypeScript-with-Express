import "reflect-metadata"
import {Methods} from "./Methods"
import {MetadataKeys} from "./MetadataKeys"
import { RequestHandler } from "express"

interface PropertyDescriptorWithRequestHandler extends PropertyDescriptor{
  value?:RequestHandler
}

function routeBinder(method:string){
  return (path:string)=>{
    return (target:any,key:string,desc:PropertyDescriptorWithRequestHandler)=>{
      Reflect.defineMetadata(MetadataKeys.path, path, target,key)
      Reflect.defineMetadata(MetadataKeys.method, method, target,key)
    }
  }
}

export let GET=routeBinder(Methods.get)
export let POST=routeBinder(Methods.post)
export let PUT=routeBinder(Methods.put)
export let PATCH=routeBinder(Methods.patch)
export let DELETE=routeBinder(Methods.delete)