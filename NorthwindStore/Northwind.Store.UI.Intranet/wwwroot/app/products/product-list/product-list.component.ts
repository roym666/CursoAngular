import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';



import { ProductService } from '../product.service';
import { Product, Respuesta } from '../IProduct';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { HttpErrorResponse } from '@angular/common/http';

import { Paginacion } from '../../shared/paginacion.model';

import { ToastService } from '../../shared/toast/toast.service';

@Component({
    templateUrl: `./product-list.component.html`,
    providers: [ProductService, ToastService]
})
export class ProductListComponent implements OnInit {
    products: Product[];

    filter: string;
    product: Product;
    respuesta: Observable<Respuesta>;
    errorMessage: string;
    saveSuccess: boolean;
    saveError: boolean;
    numeroDePaginas: any[] = [];
    //paginaSeleccionadaActual: number = 1;
    //columna: string = "productId";
    //ordenamiento: string = "asc";

    paginacion: Paginacion = new Paginacion();
    private searchTerms = new BehaviorSubject(this.paginacion);
    constructor(private route: ActivatedRoute, private ps: ProductService,private ts: ToastService) { }


    ngOnInit(): void {
        this.ts.activate('hola a todos con toast component');
        this.paginacion.columna = 'productId';
        this.paginacion.filtro = '';
        this.paginacion.ordenamiento = 'asc';
        this.paginacion.paginaSeleccionadaActual = 1;

        this.filter = this.route.snapshot.queryParams['filterBy'] || '';

        this.saveSuccess = false;
        this.saveError = false;
        // Requiere el pipe async
        this.respuesta = this.searchTerms.
            debounceTime(300).
            //distinctUntilChanged().
            switchMap(term => term
                ? this.ps.searchProducts(term)
                : Observable.of<Respuesta>()).
            catch(this.handleError);

        this.respuesta.subscribe(v => {
            this.products = v.valorRetorno;
           
            this.numeroDePaginas = [];
            for (let i = 1; i <= Math.round(v.totalPaginas); i++) {
                this.numeroDePaginas.push({ pageNumber: i, isSelected: i == 1 ? true : false });
            }
        });
        this.search();
    }

    //post(): void {

    //    this.ps.createProduct(
    //        {
    //            productId: 0,
    //            productName: "Demostración",
    //            supplierId: null,
    //            categoryId: null,
    //            quantityPerUnit: "1",
    //            unitPrice: 100,
    //            unitsInStock: 1,
    //            unitsOnOrder: 0,
    //            reorderLevel: 0,
    //            discontinued: false
    //        })
    //        .subscribe(product => {
    //            this.product = product;
    //            console.log(this.product);
    //            console.log('Successfully create!');
    //        },
    //        error => this.errorMessage = <any>error);
    //}

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
        console.log(this.paginacion.filtro);
        this.searchTerms.next(this.paginacion);
    }

    private handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return Observable.throw(err.message);
    }

    seleccionarPagina(e: any) {
        this.paginacion.paginaSeleccionadaActual = + e.target.innerText;
        this.searchTerms.next(this.paginacion);
    }

    ordernar(columna: string) {
        this.paginacion.columna = columna;
        this.paginacion.ordenamiento = 'asc';
        this.searchTerms.next(this.paginacion);
    }
}