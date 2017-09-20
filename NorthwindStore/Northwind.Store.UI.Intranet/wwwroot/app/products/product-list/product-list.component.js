"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var product_service_1 = require("../product.service");
var Observable_1 = require("rxjs/Observable");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
require("rxjs/add/observable/of");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/operator/switchMap");
require("rxjs/add/operator/catch");
var paginacion_model_1 = require("../../shared/paginacion.model");
var ProductListComponent = (function () {
    function ProductListComponent(route, ps) {
        this.route = route;
        this.ps = ps;
        this.numeroDePaginas = [];
        //paginaSeleccionadaActual: number = 1;
        //columna: string = "productId";
        //ordenamiento: string = "asc";
        this.paginacion = new paginacion_model_1.Paginacion();
        this.searchTerms = new BehaviorSubject_1.BehaviorSubject(this.paginacion);
    }
    ProductListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.paginacion.columna = 'productId';
        this.paginacion.filtro = '';
        this.paginacion.ordenamiento = 'asc';
        this.paginacion.paginaSeleccionadaActual = 1;
        this.filter = this.route.snapshot.queryParams['filterBy'] || '';
        this.saveSuccess = false;
        this.saveError = false;
        // Requiere el pipe async
        this.products = this.searchTerms.
            debounceTime(300).
            //distinctUntilChanged().
            switchMap(function (term) { return term
            ? _this.ps.searchProducts(term)
            : Observable_1.Observable.of([]); }).
            catch(this.handleError);
        this.search();
        //aca solo se muestran 8 paginas
        this.numeroDePaginas = [];
        console.log(8);
        for (var i = 1; i <= Math.round(8); i++) {
            this.numeroDePaginas.push({ pageNumber: i, isSelected: i == 1 ? true : false });
        }
    };
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
    ProductListComponent.prototype.get = function () {
        var _this = this;
        this.ps.getProduct(this.product.productId)
            .subscribe(function (product) {
            _this.product = product;
            console.log(_this.product);
            console.log('Successfully read!');
        }, function (error) { return _this.errorMessage = error; });
    };
    ProductListComponent.prototype.put = function () {
        var _this = this;
        this.product.productName += '1';
        this.ps.updateProduct(this.product)
            .subscribe(function () {
            console.log('Successfully update!');
        }, function (error) { return _this.errorMessage = error; });
    };
    //delete(): void {
    //    this.ps.deleteProduct(this.product.productId)
    //        .subscribe(() => {
    //            console.log('Successfully deleted!');
    //        },
    //        error => this.errorMessage = <any>error);
    //}
    ProductListComponent.prototype.delete1 = function (id) {
        var _this = this;
        this.ps.deleteProduct(id)
            .subscribe(function () {
            _this.saveSuccess = true;
            _this.saveError = false;
            console.log('Successfully deleted!');
            _this.search();
        }, function (error) {
            _this.errorMessage = error;
            _this.saveSuccess = false;
            _this.saveError = true;
        });
    };
    //obtenerTodos(): void {
    //    this.products = this.ps.getProducts();
    //}
    //search(term: string): void {
    //    this.searchTerms.next(term);
    //}
    ProductListComponent.prototype.search = function () {
        console.log(this.paginacion.filtro);
        this.searchTerms.next(this.paginacion);
    };
    ProductListComponent.prototype.handleError = function (err) {
        console.error(err.message);
        return Observable_1.Observable.throw(err.message);
    };
    ProductListComponent.prototype.seleccionarPagina = function (e) {
        this.paginacion.paginaSeleccionadaActual = +e.target.innerText;
        this.searchTerms.next(this.paginacion);
    };
    ProductListComponent.prototype.ordernar = function (columna) {
        this.paginacion.columna = columna;
        this.paginacion.ordenamiento = 'asc';
        this.searchTerms.next(this.paginacion);
    };
    ProductListComponent = __decorate([
        core_1.Component({
            templateUrl: "./product-list.component.html",
            providers: [product_service_1.ProductService]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, product_service_1.ProductService])
    ], ProductListComponent);
    return ProductListComponent;
}());
exports.ProductListComponent = ProductListComponent;
//# sourceMappingURL=product-list.component.js.map