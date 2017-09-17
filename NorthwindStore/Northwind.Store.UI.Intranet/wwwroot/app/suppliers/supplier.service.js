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
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/throw");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/do");
var SupplierService = (function () {
    function SupplierService(http) {
        this.http = http;
        this.apiUrl = 'https://localhost:44394/api/supplier';
        this.headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
    }
    SupplierService.prototype.getSuppliers = function () {
        return this.http.get(this.apiUrl)
            .do(function (data) { return console.log('getSupplier: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    SupplierService.prototype.handleError = function (err) {
        console.error(err.message);
        return Observable_1.Observable.throw(err.message);
    };
    SupplierService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], SupplierService);
    return SupplierService;
}());
exports.SupplierService = SupplierService;
//# sourceMappingURL=supplier.service.js.map