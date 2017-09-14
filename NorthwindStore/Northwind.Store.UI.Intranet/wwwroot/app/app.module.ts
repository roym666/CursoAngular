import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './shared/page-not-found';
import { ProductsModule } from './products/products.module';

import { LoginGuard } from './shared/login-guard.service';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'products', loadChildren: './app/products/products.module#ProductsModule', canActivate: [LoginGuard], canLoad: [LoginGuard] },
    { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
    imports: [BrowserModule, RouterModule.forRoot(routes, { enableTracing: true, preloadingStrategy: PreloadAllModules })],
    declarations: [AppComponent, HomeComponent, PageNotFoundComponent],
    bootstrap: [AppComponent], providers: [LoginGuard]
})
export class AppModule { }
