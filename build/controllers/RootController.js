"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = require("./decorators");
var RootController = /** @class */ (function () {
    function RootController() {
    }
    RootController.prototype.getRootRoute = function (req, res) {
        if (req.session && req.session.isLoggedIn) {
            res.send("\n    logged in\n    <a href=\"/auth/logout\">Logout</a>\n    ");
        }
        else {
            res.send("\n      user not logged in\n      <a href=\"/auth/login\">Login</a>\n      ");
        }
    };
    __decorate([
        decorators_1.GET("/"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], RootController.prototype, "getRootRoute", null);
    RootController = __decorate([
        decorators_1.controller("")
    ], RootController);
    return RootController;
}());