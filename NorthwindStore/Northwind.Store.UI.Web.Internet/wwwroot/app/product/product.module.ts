import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './product-routing.module';

import { ProductListComponent } from './product-list/product-list.component'

@NgModule({
    imports: [CommonModule, HttpClientModule, FormsModule, ProductsRoutingModule],
    declarations: [
        ProductListComponent
    ]
})
export class ProductModule { }