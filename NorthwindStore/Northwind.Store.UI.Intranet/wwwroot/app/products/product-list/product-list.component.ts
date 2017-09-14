import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';



import { ProductService } from '../product.service';
import { Product } from '../IProduct';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { HttpErrorResponse } from '@angular/common/http';

@Component({
    templateUrl: `./product-list.component.html`,
    providers: [ProductService]
})
export class ProductListComponent implements OnInit {
    products: Observable<Product[]>;
    private searchTerms = new BehaviorSubject('');
    filter: string;
    product: Product;
    errorMessage: string;
    saveSuccess: boolean;
    saveError: boolean;

    constructor(private route: ActivatedRoute, private ps: ProductService) { }


    ngOnInit(): void {

        this.filter = this.route.snapshot.queryParams['filterBy'] || '';

        this.saveSuccess = false;
        this.saveError = false;
        // Requiere el pipe async
        this.products = this.searchTerms.
            debounceTime(300).
            distinctUntilChanged().
            switchMap(term => term
                ? this.ps.searchProducts(term)
                : Observable.of<Product[]>([])).
            catch(this.handleError);
        this.search();

    }

    post(): void {

        this.ps.createProduct(
            {
                productId: 0,
                productName: "Demostración",
                supplierId: null,
                categoryId: null,
                quantityPerUnit: "1",
                unitPrice: 100,
                unitsInStock: 1,
                unitsOnOrder: 0,
                reorderLevel: 0,
                discontinued: false
            })
            .subscribe(product => {
                this.product = product;
                console.log(this.product);
                console.log('Successfully create!');
            },
            error => this.errorMessage = <any>error);
    }

    get(): void {
        this.ps.getProduct(this.product.productId)
            .subscribe(product => {
                this.product = product;
                console.log(this.product);
                console.log('Successfully read!');
            },
            error => this.errorMessage = <any>error);
    }

    put(): void {
        this.product.productName += '1';

        this.ps.updateProduct(this.product)
            .subscribe(() => {
                console.log('Successfully update!');
            },
            error => this.errorMessage = <any>error);
    }

    //delete(): void {
    //    this.ps.deleteProduct(this.product.productId)
    //        .subscribe(() => {

    //            console.log('Successfully deleted!');
    //        },
    //        error => this.errorMessage = <any>error);
    //}

    delete1(id: any): void {
        this.ps.deleteProduct(id)
            .subscribe(() => {
                this.saveSuccess = true;
                this.saveError = false;
                console.log('Successfully deleted!');
                this.search();
            },
            error => {
                this.errorMessage = <any>error
                this.saveSuccess = false;
                this.saveError = true;
            });
    }

    //obtenerTodos(): void {
    //    this.products = this.ps.getProducts();
    //}

    //search(term: string): void {
    //    this.searchTerms.next(term);
    //}

    search() {
        this.searchTerms.next(this.filter);
    }

    private handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return Observable.throw(err.message);
    }
}