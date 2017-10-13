import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { CarritoService } from '../carrito.service';
import { Product } from '../../product/product.model';

@Component({
    templateUrl: './carrito-list.component.html'
})
export class CarritoListComponent implements OnInit {

    products: Product[];
    constructor(private route: ActivatedRoute, private router: Router, private cs: CarritoService) { }

    ngOnInit(): void {                          
        this.products = this.cs.listarCarrito() 
    }
}