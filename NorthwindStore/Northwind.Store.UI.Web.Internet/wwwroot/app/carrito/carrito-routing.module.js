"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var carrito_list_component_1 = require("./carrito-list/carrito-list.component");
var carrito_add_component_1 = require("./carrito-add/carrito-add.component");
//import { ProductDetailComponent } from './product-detail/product-detail.component'
//import { ProductService } from './product.service'
//import { ProductResolver } from './product-resolver.service';
var routes = [
    {
        path: '',
        children: [
            { path: '', component: carrito_list_component_1.CarritoListComponent, data: { header: 'Carrito List' } },
            { path: ':id/add', component: carrito_add_component_1.CarritoAddComponent, data: { header: 'Add to Carrito' } }
        ]
    }
];
var CarritoRoutingModule = (function () {
    function CarritoRoutingModule() {
    }
    CarritoRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule],
            providers: []
        })
    ], CarritoRoutingModule);
    return CarritoRoutingModule;
}());
exports.CarritoRoutingModule = CarritoRoutingModule;
//# sourceMappingURL=carrito-routing.module.js.map