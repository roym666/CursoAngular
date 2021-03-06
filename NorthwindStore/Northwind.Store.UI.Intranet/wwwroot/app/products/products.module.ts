﻿import { NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component'
import { ProductCreateComponent } from './product-create/product-create.component'
import { ProductDetailComponent } from './product-detail/product-detail.component'
import { ProductEditComponent } from './product-edit/product-edit.component'

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ProductService } from './product.service';
import { ProductResolver } from './product-resolver.service';

import { SupplierService } from '../suppliers/supplier.service';
import { CategoryService } from '../categories/category.service';

import { ProductDetailExtraComponent } from '../products/product-detail-extra/product-detail-extra.component';
const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: ProductListComponent
            },
            {
                path: 'create',
                component: ProductCreateComponent
            },
            {
                path: ':id',
                component: ProductDetailComponent,
                resolve: { product: ProductResolver },
                children: [{ path: 'extra', component: ProductDetailExtraComponent }]
            },
            {
                path: ':id/edit',
                component: ProductEditComponent,
                resolve: { product: ProductResolver }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), HttpModule, CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule],
    declarations: [
        ProductListComponent,
        ProductCreateComponent,
        ProductDetailComponent,
        ProductEditComponent,
        ProductDetailExtraComponent
    ], providers: [ProductService, ProductResolver, CategoryService, SupplierService]
})
export class ProductsModule { }