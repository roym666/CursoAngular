﻿import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { Product } from './IProduct';

@Injectable()
export class ProductService {
    private apiUrl = 'https://localhost:44394/api/Product';
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private http: HttpClient) { }

    searchProducts(term: string, pagina: number, columna: string, dir: string): Observable<Product[]> {
        // int pagina = 1, string columna = "productId", string dir = "asc"
        return this.http
            .get<Product[]>(`${this.apiUrl}/?name=${term}&pagina=${pagina}&columna=${columna}&dir=${dir}`)
            .do(data => console.log('searchProducts: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl)
            .do(data => console.log('getProducts: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getProduct(id: number): Observable<Product> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Product>(url)
            .do(data => console.log('getProduct: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    updateProduct(product: Product): Observable<Product> {
        console.log(product);
        const url = `${this.apiUrl}/${product.productId}`;
        return this.http
            .put(url, JSON.stringify(product), { headers: this.headers })
            .do(data => console.log('updateProduct: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    createProduct(product: Product): Observable<Product> {
        return this.http
            .post(this.apiUrl, JSON.stringify(product), { headers: this.headers })
            .do(data => console.log('createProduct: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    deleteProduct(id: number): Observable<void> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return Observable.throw(err.message);
    }
}