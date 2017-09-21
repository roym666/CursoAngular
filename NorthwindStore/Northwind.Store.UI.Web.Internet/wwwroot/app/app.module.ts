import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './shared/page-not-found';

const routes: Routes = [
    { path: '', redirectTo: 'product', pathMatch: 'full' },
    {
        path: 'product', loadChildren: 'app/product/product.module#ProductModule'
    }, {
        path: 'carrito', loadChildren: 'app/carrito/carrito.module#CarritoModule',
    },
    { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
    imports: [BrowserModule,
        RouterModule.forRoot(routes)],
    declarations: [AppComponent, PageNotFoundComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }