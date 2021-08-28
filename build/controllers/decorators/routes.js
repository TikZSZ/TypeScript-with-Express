"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE = exports.PATCH = exports.PUT = exports.POST = exports.GET = void 0;
require("reflect-metadata");
var Methods_1 = require("./Methods");
var MetadataKeys_1 = require("./MetadataKeys");
function routeBinder(method) {
    return function (path) {
        return function (target, key, desc) {
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.path, path, target, key);
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.method, method, target, key);
        };
    };
}
exports.GET = routeBinder(Methods_1.Methods.get);
exports.POST = routeBinder(Methods_1.Methods.post);
exports.PUT = routeBinder(Methods_1.Methods.put);
exports.PATCH = routeBinder(Methods_1.Methods.patch);
exports.DELETE = routeBinder(Methods_1.Methods.delete);
