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
var ProductService = (function () {
    function ProductService(http) {
        this.http = http;
        this.apiUrl = 'https://localhost:44394/api/Product';
        this.headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
    }
    ProductService.prototype.searchProducts = function (paginacion) {
        // int pagina = 1, string columna = "productId", string dir = "asc"
        return this.http
            .get(this.apiUrl + "/?name=" + paginacion.filtro + "&pagina=" + paginacion.paginaSeleccionadaActual + "&columna=" + paginacion.columna + "&dir=" + paginacion.ordenamiento)
            .do(function (data) { return console.log('searchProducts: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    ProductService.prototype.getProducts = function () {
        return this.http.get(this.apiUrl)
            .do(function (data) { return console.log('getProducts: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    ProductService.prototype.getProduct = function (id) {
        var url = this.apiUrl + "/" + id;
        return this.http.get(url)
            .do(function (data) { return console.log('getProduct: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    ProductService.prototype.updateProduct = function (product) {
        console.log(product);
        var url = this.apiUrl + "/" + product.productId;
        return this.http
            .put(url, JSON.stringify(product), { headers: this.headers })
            .do(function (data) { return console.log('updateProduct: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    ProductService.prototype.createProduct = function (product) {
        return this.http
            .post(this.apiUrl, JSON.stringify(product), { headers: this.headers })
            .do(function (data) { return console.log('createProduct: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    ProductService.prototype.deleteProduct = function (id) {
        var url = this.apiUrl + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .catch(this.handleError);
    };
    ProductService.prototype.handleError = function (err) {
        console.error(err.message);
        return Observable_1.Observable.throw(err.message);
    };
    ProductService.prototype.getRank = function (id) {
        var url = this.apiUrl + "/" + id + "/rank";
        return this.http.get(url)
            .do(function (data) { return console.log('getRank: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    ProductService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], ProductService);
    return ProductService;
}());
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map