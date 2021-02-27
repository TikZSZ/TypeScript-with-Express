
import "reflect-metadata"
import {MetadataKeys} from "./MetadataKeys"

//bodyValidator(email,pass)

export function bodyValidator(...keys:string[]){
  return (target:any,key:string,desc:PropertyDescriptor)=>{
    console.log(keys);
    
    Reflect.defineMetadata(MetadataKeys.bodyValidators,keys,target,key)
  }
}