"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyValidator = void 0;
require("reflect-metadata");
var MetadataKeys_1 = require("./MetadataKeys");
//bodyValidator(email,pass)
function bodyValidator() {
    var keys = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        keys[_i] = arguments[_i];
    }
    return function (target, key, desc) {
        console.log(keys);
        Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.bodyValidators, keys, target, key);
    };
}
exports.bodyValidator = bodyValidator;
