import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from './product-list/product-list.component'
import { ProductDetailComponent } from './product-detail/product-detail.component'
import { ProductService } from './product.service'
import { ProductResolver } from './product-resolver.service';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: ProductListComponent, data: { header: 'Product List' } },
            { path: ':id', component: ProductDetailComponent, resolve: { product: ProductResolver }, data: { header: 'Product Detail' } },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        ProductService, ProductResolver
    ]
})
export class ProductsRoutingModule { }