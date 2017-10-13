import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ProductService } from './product.service';
import { Product } from './product.model';

@Injectable()
export class ProductResolver implements Resolve<Product> {

    constructor(private productService: ProductService,
        private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
        let id = +route.params['id'];

        console.log('ProductResolver.resolving ...');

        return this.productService.getProduct(+id);
    }

    // Mejora en la validación de datos de entrada y salida
    //resolve1(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    //    let id = route.params['id'];
    //    if (isNaN(id)) {
    //        console.log(`ID deber ser un número: ${id}`);
    //        this.router.navigate(['/product']);
    //        return Observable.of();
    //    }
    //    return this.productService.getProduct(+id)
    //        .map(product => {
    //            if (product) {
    //                return product;
    //            }
    //            console.log(`Product no encontrado: ${id}`);
    //            this.router.navigate(['/product']);
    //            return null;
    //        })
    //        .catch(error => {
    //            console.log(`Error al llamar al servicio: ${error}`);
    //            this.router.navigate(['/product']);
    //            return Observable.of(null);
    //        });
    //}
}
