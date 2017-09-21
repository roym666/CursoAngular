import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from '../product.service';
import { Product } from '../IProduct';

@Component({
    templateUrl: './product-detail-extra.html' 
})
export class ProductDetailExtraComponent implements OnInit {
    product: Product = null;
    errorMessage: string;
    grupos: any;

    constructor(private ps: ProductService, private route: ActivatedRoute) { }

    ngOnInit(): void { 
        console.log('ProductDetailExtraComponent loaded ...');
        // Parent data
        this.product = this.route.parent.snapshot.data['product'];
        console.log(this.product);

        this.ps.getRank(this.product.productId)
            .subscribe(grupos => {
                this.grupos = grupos;
                console.log(this.grupos);
                console.log('Successfully read!');
            },
            error => this.errorMessage = <any>error);
    }
}