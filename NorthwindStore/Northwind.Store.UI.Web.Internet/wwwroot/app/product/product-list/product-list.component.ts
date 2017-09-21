import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
    templateUrl: './product-list.component.html',
    providers: [ProductService]
})
export class ProductListComponent implements OnInit {

    products: Observable<Product[]>;
    filter: string;

    constructor(private ps: ProductService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {

    }

    onSearchKey(event: KeyboardEvent): void {
        if (event.keyCode == 13) {
            this.products = this.ps.searchProducts(this.filter);
        }
    }

    trackByProduct(index: number, p: Product): number { return p.productId; }
}