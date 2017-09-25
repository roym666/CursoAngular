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
var product_service_1 = require("../../product/product.service");
var product_model_1 = require("../../product/product.model");
require("rxjs/add/observable/of");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/operator/switchMap");
require("rxjs/add/operator/catch");
var carrito_service_1 = require("../carrito.service");
var CarritoAddComponent = (function () {
    function CarritoAddComponent(route, router, ps, cs) {
        this.route = route;
        this.router = router;
        this.ps = ps;
        this.cs = cs;
        this.product = new product_model_1.Product();
    }
    CarritoAddComponent.prototype.ngOnInit = function () {
        ////resolver
        //this.product = this.route.snapshot.data['product'];
        ////resolver observable (misma ruta)
        //this.route.data.subscribe(data => this.product = data['product']);
        //if (!this.product) {
        var id = +this.route.snapshot.params['id'];
        this.get(id);
        console.log(id);
        //}
        //Query
        var filter = this.route.snapshot.queryParams['filterBy'] || '';
        console.log(filter);
        // TODO Llamar a la lógica
    };
    CarritoAddComponent.prototype.onBack = function () {
        // Ir a la vista inicial
        this.router.navigate(['/products'], { queryParamsHandling: 'preserve' });
    };
    CarritoAddComponent.prototype.get = function (id) {
        var _this = this;
        this.ps.getProduct(id)
            .subscribe(function (product) {
            _this.product = product;
            console.log(_this.product);
            console.log('Successfully read!');
            _this.cs.agregarCarrito(product);
            _this.router.navigate(['/carrito']);
        }, function (error) { return _this.errorMessage = error; });
    };
    CarritoAddComponent = __decorate([
        core_1.Component({
            template: '',
            providers: [product_service_1.ProductService]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, product_service_1.ProductService, carrito_service_1.CarritoService])
    ], CarritoAddComponent);
    return CarritoAddComponent;
}());
exports.CarritoAddComponent = CarritoAddComponent;
//# sourceMappingURL=carrito-add.component.js.map