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
var router_1 = require("@angular/router");
var product_service_1 = require("../product.service");
var ProductListComponent = (function () {
    function ProductListComponent(ps, route, router) {
        this.ps = ps;
        this.route = route;
        this.router = router;
    }
    ProductListComponent.prototype.ngOnInit = function () {
    };
    ProductListComponent.prototype.onSearchKey = function (event) {
        if (event.keyCode == 13) {
            this.products = this.ps.searchProducts(this.filter);
        }
    };
    ProductListComponent.prototype.trackByProduct = function (index, p) { return p.productId; };
    ProductListComponent = __decorate([
        core_1.Component({
            templateUrl: './product-list.component.html'
        }),
        __metadata("design:paramtypes", [product_service_1.ProductService, router_1.ActivatedRoute, router_1.Router])
    ], ProductListComponent);
    return ProductListComponent;
}());
exports.ProductListComponent = ProductListComponent;
//# sourceMappingURL=product-list.component.js.map