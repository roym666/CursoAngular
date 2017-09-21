import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { Product } from './product.model';

@Injectable()
export class ProductService {
    private apiUrl = 'https://localhost:44394/api/Product';
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private http: HttpClient) { }

    searchProducts(term: string): Observable<Product[]> {
        return this.http
            .get<Product[]>(`${this.apiUrl}/productsWeb?name=${term}`)
            .catch(this.handleError);
    }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl)
            .catch(this.handleError);
    }

    getProduct(id: number): Observable<Product> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Product>(url)
            .catch(this.handleError);
    }

    getRank(id: number): Observable<any> {
        const url = `${this.apiUrl}/${id}/rank`;
        return this.http.get<any>(url)
            .do(data => console.log('getRank: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    updateProduct(product: Product): Observable<Product> {
        console.log(product);
        const url = `${this.apiUrl}/${product.productId}`;
        return this.http
            .put(url, JSON.stringify(product), { headers: this.headers })
            .catch(this.handleError);
    }

    createProduct(product: Product): Observable<Product> {
        return this.http
            .post(this.apiUrl, JSON.stringify(product), { headers: this.headers })
            .catch(this.handleError);
    }

    deleteProduct(id: number): Observable<void> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        return Observable.throw(err.message);
    }
}