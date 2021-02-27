"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = exports.controller = void 0;
require("reflect-metadata");
var AppRouter_1 = require("../../AppRouter");
var MetadataKeys_1 = require("./MetadataKeys");
var router = AppRouter_1.AppRouter.getInstance();
exports.router = router;
function bodyValidator(keys) {
    return function (req, res, next) {
        console.log(req.body);
        if (!req.body) {
            res.status(422).send("invalid request");
            return;
        }
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (!req.body[key]) {
                res.status(422).send("missing property " + key);
                return;
            }
        }
        next();
    };
}
function controller(routePrefix) {
    return function (target) {
        for (var key in target.prototype) {
            var routeHanlder = target.prototype[key];
            var path = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.path, target.prototype, key);
            var method = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.method, target.prototype, key);
            var middilewares = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.middleware, target.prototype, key) ||
                [];
            var bodyValidators = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.bodyValidators, target.prototype, key) || [];
            var validator = bodyValidator(bodyValidators);
            if (path) {
                router[method].apply(router, __spreadArrays(["" + routePrefix + path], middilewares, [validator, routeHanlder]));
            }
        }
    };
}
exports.controller = controller;
