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
exports.LoginController = void 0;
var decorators_1 = require("./decorators");
var LoginController = /** @class */ (function () {
    function LoginController() {
    }
    LoginController.prototype.getLogin = function (req, res) {
        res.send("\n  <form method=\"POST\">\n  <div>\n    <label for=\"\">Email</label>\n    <input type=\"text\" name=\"email\">\n  </div>\n  <div>\n    <label for=\"\">password</label>\n    <input type=\"password\" name=\"pass\">\n  </div>\n  <button type=\"submit\">Submit</button>\n  </form>\n  ");
    };
    LoginController.prototype.letLogin = function (req, res) {
        var _a = req.body, email = _a.email, pass = _a.pass;
        if (email === "ad" && pass === "pass" && req.session) {
            req.session = { isLoggedIn: true };
            console.log(req.session);
            res.redirect("/");
        }
    };
    LoginController.prototype.logOut = function (req, res) {
        req.session = undefined;
        res.redirect("/");
    };
    __decorate([
        decorators_1.GET("/login"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "getLogin", null);
    __decorate([
        decorators_1.POST("/login"),
        decorators_1.bodyValidator("email", "pass"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "letLogin", null);
    __decorate([
        decorators_1.GET("/logout"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "logOut", null);
    LoginController = __decorate([
        decorators_1.controller("/auth")
    ], LoginController);
    return LoginController;
}());
exports.LoginController = LoginController;
