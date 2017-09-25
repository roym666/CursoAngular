import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarritoListComponent } from './carrito-list/carrito-list.component'
import { CarritoAddComponent } from './carrito-add/carrito-add.component'
//import { ProductDetailComponent } from './product-detail/product-detail.component'
//import { ProductService } from './product.service'
//import { ProductResolver } from './product-resolver.service';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: CarritoListComponent, data: { header: 'Carrito List' } },
            { path: ':id/add', component: CarritoAddComponent, data: { header: 'Add to Carrito' } }
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