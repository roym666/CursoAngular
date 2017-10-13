import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './product-routing.module';

import { ProductListComponent } from './product-list/product-list.component'
import { ProductDetailComponent } from './product-detail/product-detail.component'

@NgModule({
    imports: [CommonModule, HttpClientModule, FormsModule, ProductsRoutingModule],
    declarations: [
        ProductListComponent, ProductDetailComponent
    ]
})
export class ProductModule { }