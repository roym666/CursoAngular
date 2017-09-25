import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { Product } from '../product/product.model';

@Injectable()
export class CarritoService {
    productsCarrito: Product[] = [];
    constructor() { }

    agregarCarrito(p: Product) {
        this.productsCarrito.push(p);
        console.log('add servicio');
        console.log(this.productsCarrito);
    }

    listarCarrito(): Product[] {
        return this.productsCarrito;
    }
}