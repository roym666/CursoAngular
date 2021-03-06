"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
var page_not_found_1 = require("./shared/page-not-found");
var carrito_service_1 = require("./carrito/carrito.service");
var routes = [
    { path: '', redirectTo: 'product', pathMatch: 'full' },
    {
        path: 'product', loadChildren: 'app/product/product.module#ProductModule'
    }, {
        path: 'carrito', loadChildren: 'app/carrito/carrito.module#CarritoModule',
    },
    { path: '**', pathMatch: 'full', component: page_not_found_1.PageNotFoundComponent },
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule,
                router_1.RouterModule.forRoot(routes)],
            declarations: [app_component_1.AppComponent, page_not_found_1.PageNotFoundComponent],
            bootstrap: [app_component_1.AppComponent],
            providers: [carrito_service_1.CarritoService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map