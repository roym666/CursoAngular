import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

@Component({
    templateUrl: './carrito-list.component.html',
})
export class CarritoListComponent implements OnInit {
    constructor(private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {

    }
}