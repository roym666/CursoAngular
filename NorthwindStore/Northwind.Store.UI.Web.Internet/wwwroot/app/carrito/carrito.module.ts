import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { CarritoRoutingModule } from './carrito-routing.module';

import { CarritoListComponent } from './carrito-list/carrito-list.component'
import { CarritoAddComponent } from './carrito-add/carrito-add.component'    

@NgModule({
    imports: [CommonModule, HttpClientModule, FormsModule, CarritoRoutingModule],
    declarations: [
        CarritoListComponent, CarritoAddComponent
    ]
})
export class CarritoModule { }