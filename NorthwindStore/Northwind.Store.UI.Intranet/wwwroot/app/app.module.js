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
var app_component_1 = require("./app.component");
var router_1 = require("@angular/router");
var home_component_1 = require("./home/home.component");
var page_not_found_1 = require("./shared/page-not-found");
var login_guard_service_1 = require("./shared/login-guard.service");
var toast_module_1 = require("./shared/toast/toast.module");
var modal_module_1 = require("./shared/modal/modal.module");
var routes = [
    { path: 'home', component: home_component_1.HomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'products', loadChildren: './app/products/products.module#ProductsModule', canActivate: [login_guard_service_1.LoginGuard], canLoad: [login_guard_service_1.LoginGuard] },
    { path: '**', pathMatch: 'full', component: page_not_found_1.PageNotFoundComponent },
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, router_1.RouterModule.forRoot(routes, { enableTracing: true, preloadingStrategy: router_1.PreloadAllModules }), toast_module_1.ToastModule, modal_module_1.ModalModule],
            declarations: [app_component_1.AppComponent, home_component_1.HomeComponent, page_not_found_1.PageNotFoundComponent],
            bootstrap: [app_component_1.AppComponent], providers: [login_guard_service_1.LoginGuard]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map