"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
//import { BrowserModule } from '@angular/platform-browser';
var router_1 = require("@angular/router");
var product_list_component_1 = require("./product-list/product-list.component");
var product_create_component_1 = require("./product-create/product-create.component");
var product_detail_component_1 = require("./product-detail/product-detail.component");
var product_edit_component_1 = require("./product-edit/product-edit.component");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var forms_2 = require("@angular/forms");
var common_1 = require("@angular/common");
var http_2 = require("@angular/common/http");
var product_service_1 = require("./product.service");
var product_resolver_service_1 = require("./product-resolver.service");
var supplier_service_1 = require("../suppliers/supplier.service");
var category_service_1 = require("../categories/category.service");
var product_detail_extra_component_1 = require("../products/product-detail-extra/product-detail-extra.component");
var routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: product_list_component_1.ProductListComponent
            },
            {
                path: 'create',
                component: product_create_component_1.ProductCreateComponent
            },
            {
                path: ':id',
                component: product_detail_component_1.ProductDetailComponent,
                resolve: { product: product_resolver_service_1.ProductResolver },
                children: [{ path: 'extra', component: product_detail_extra_component_1.ProductDetailExtraComponent }]
            },
            {
                path: ':id/edit',
                component: product_edit_component_1.ProductEditComponent,
                resolve: { product: product_resolver_service_1.ProductResolver }
            }
        ]
    }
];
var ProductsModule = (function () {
    function ProductsModule() {
    }
    ProductsModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes), http_1.HttpModule, common_1.CommonModule, forms_1.FormsModule, http_2.HttpClientModule, forms_2.ReactiveFormsModule],
            declarations: [
                product_list_component_1.ProductListComponent,
                product_create_component_1.ProductCreateComponent,
                product_detail_component_1.ProductDetailComponent,
                product_edit_component_1.ProductEditComponent,
                product_detail_extra_component_1.ProductDetailExtraComponent
            ], providers: [product_service_1.ProductService, product_resolver_service_1.ProductResolver, category_service_1.CategoryService, supplier_service_1.SupplierService]
        })
    ], ProductsModule);
    return ProductsModule;
}());
exports.ProductsModule = ProductsModule;
//# sourceMappingURL=products.module.js.map