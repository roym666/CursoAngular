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
var ProductEditComponent = (function () {
    function ProductEditComponent(route, router) {
        this.route = route;
        this.router = router;
    }
    ProductEditComponent.prototype.ngOnInit = function () {
        this.route.params.subscribe(function (params) {
            var id = +params['id'];
            // TODO Llamar a la lógica
            console.log(id);
        });
    };
    ProductEditComponent.prototype.onBack = function () {
        // Ir a la vista inicial
        this.router.navigate(['/products']);
    };
    ProductEditComponent = __decorate([
        core_1.Component({
            template: './product-edit.component.html',
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router])
    ], ProductEditComponent);
    return ProductEditComponent;
}());
exports.ProductEditComponent = ProductEditComponent;
//# sourceMappingURL=product-edit.component.js.map