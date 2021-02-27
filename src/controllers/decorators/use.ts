import { RequestHandler } from "express";
import "reflect-metadata";
import { MetadataKeys } from "./MetadataKeys";

export function use(middleware: RequestHandler) {
  return (target: any, key: string, desc: PropertyDescriptor) => {
    let middlewares: RequestHandler[] = Reflect.getMetadata(
      MetadataKeys.middleware,
      target, 
      key
    ) || [];

    Reflect.defineMetadata(
      MetadataKeys.middleware,
      [...middlewares,middleware],
      target,
      key
    );

  };
}
