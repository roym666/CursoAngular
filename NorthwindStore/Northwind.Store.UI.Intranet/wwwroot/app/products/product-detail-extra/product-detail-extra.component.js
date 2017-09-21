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
var ProductDetailExtraComponent = (function () {
    function ProductDetailExtraComponent(ps, route) {
        this.ps = ps;
        this.route = route;
        this.product = null;
    }
    ProductDetailExtraComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('ProductDetailExtraComponent loaded ...');
        // Parent data
        this.product = this.route.parent.snapshot.data['product'];
        console.log(this.product);
        this.ps.getRank(this.product.productId)
            .subscribe(function (grupos) {
            _this.grupos = grupos;
            console.log(_this.grupos);
            console.log('Successfully read!');
        }, function (error) { return _this.errorMessage = error; });
    };
    ProductDetailExtraComponent = __decorate([
        core_1.Component({
            templateUrl: './product-detail-extra.html'
        }),
        __metadata("design:paramtypes", [product_service_1.ProductService, router_1.ActivatedRoute])
    ], ProductDetailExtraComponent);
    return ProductDetailExtraComponent;
}());
exports.ProductDetailExtraComponent = ProductDetailExtraComponent;
//# sourceMappingURL=product-detail-extra.component.js.map