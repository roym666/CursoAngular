import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from './product-list/product-list.component'
import { ProductService } from './product.service'

const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: ProductListComponent, data: { header: 'Product List' } },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        ProductService,
    ]
})
export class ProductsRoutingModule { }