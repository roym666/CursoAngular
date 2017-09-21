import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarritoListComponent } from './carrito-list/carrito-list.component'
//import { ProductDetailComponent } from './product-detail/product-detail.component'
//import { ProductService } from './product.service'
//import { ProductResolver } from './product-resolver.service';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: CarritoListComponent, data: { header: 'Carrito List' } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [

    ]
})
export class CarritoRoutingModule { }