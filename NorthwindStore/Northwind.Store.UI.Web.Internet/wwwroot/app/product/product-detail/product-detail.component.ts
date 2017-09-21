import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';


import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

@Component({
    templateUrl: './product-detail.component.html',
    providers: [ProductService]
})
export class ProductDetailComponent implements OnInit {
    product: Product = new Product();
    errorMessage: string;
    constructor(private route: ActivatedRoute, private router: Router, private ps: ProductService) { }

    ngOnInit(): void {
        //resolver
        this.product = this.route.snapshot.data['product'];

        //resolver observable (misma ruta)
        this.route.data.subscribe(data => this.product = data['product']);

        if (!this.product) {
            let id = +this.route.snapshot.params['id'];
            this.get(id);
            console.log(id);
        }

        //Query
        let filter = this.route.snapshot.queryParams['filterBy'] || '';

        console.log(filter);
        // TODO Llamar a la lógica
    }

    onBack(): void {

        // Ir a la vista inicial
        this.router.navigate(['/products'], { queryParamsHandling: 'preserve' });
    }

    get(id: any): void {
        this.ps.getProduct(id)
            .subscribe(product => {
                this.product = product;
                console.log(this.product);
                console.log('Successfully read!');
            },
            error => this.errorMessage = <any>error);
    }
}