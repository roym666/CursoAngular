"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var http_1 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
var carrito_routing_module_1 = require("./carrito-routing.module");
var carrito_list_component_1 = require("./carrito-list/carrito-list.component");
var carrito_add_component_1 = require("./carrito-add/carrito-add.component");
var CarritoModule = (function () {
    function CarritoModule() {
    }
    CarritoModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, http_1.HttpClientModule, forms_1.FormsModule, carrito_routing_module_1.CarritoRoutingModule],
            declarations: [
                carrito_list_component_1.CarritoListComponent, carrito_add_component_1.CarritoAddComponent
            ]
        })
    ], CarritoModule);
    return CarritoModule;
}());
exports.CarritoModule = CarritoModule;
//# sourceMappingURL=carrito.module.js.map