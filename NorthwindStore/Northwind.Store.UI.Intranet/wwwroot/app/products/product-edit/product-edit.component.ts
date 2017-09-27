import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';


import { ProductService } from '../product.service';
import { Product } from '../IProduct';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { HttpErrorResponse } from '@angular/common/http';

import { CategoryService } from '../../categories/category.service';
import { Category } from '../../categories/ICategory';

import { SupplierService } from '../../suppliers/supplier.service';
import { Supplier } from '../../suppliers/ISupplier';

import { ModalService } from '../../shared/modal/modal.service';

@Component({
    templateUrl: './product-edit.component.html',
    providers: [ProductService]
})
export class ProductEditComponent implements OnInit {
    product: Product = new Product();
    errorMessage: string;
    saveSuccess: boolean;
    saveError: boolean;
    productForm: FormGroup;

    suppliers: Observable<Supplier[]>;
    categories: Observable<Category[]>;

    constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private ps: ProductService, private cs: CategoryService, private ss: SupplierService, private modal: ModalService) { }

    ngOnInit(): void {

        this.saveError = false;
        this.saveSuccess = false;
        this.productForm = this.fb.group({
            productName: ['', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50)]],
            supplierId: ['', [
                Validators.required]],
            categoryId: ['', [
                Validators.required]]
        });

        this.productForm.get('productName').valueChanges
            .subscribe(value => this.setValidator(value));

        this.suppliers = this.ss.getSuppliers();
        this.categories = this.cs.getCategories();
        this.categories.subscribe((c) => {
            console.log('suscrito');
            console.log(c);
        });

        //resolver
        this.product = this.route.snapshot.data['product'];


        //resolver observable (misma ruta)
        this.route.data.subscribe(data => this.product = data['product']);

        this.setModel(this.product);
        //if (!this.product) {
        //    let id = +this.route.snapshot.params['id'];
        //    this.get(id);
        //    console.log(id);
        //}

        //Query
        let filter = this.route.snapshot.queryParams['filterBy'] || '';

        console.log(filter);
        // TODO Llamar a la lógica
    }

    setModel(product: Product): void {
        if (this.productForm) {
            this.productForm.reset();
        }
        this.product = product;

        this.productForm.patchValue({
            productName: this.product.productName
        });

        this.productForm.patchValue({
            supplierId: this.product.supplierId
        });

        //el set value obliga a poner todos los datos
        //this.productForm.setValue()
    }

    setValidator(value: string): void {
        console.log(`valor: ${value}!`);
        //const phoneControl = this.productForm.get('phone');
        //if (value === 'text') {
        //    phoneControl.setValidators(Validators.required);
        //} else {
        //    phoneControl.clearValidators();
        //}
        //phoneControl.updateValueAndValidity();
    }

    onBack(): void {

        // Ir a la vista inicial
        this.router.navigate(['/products'], { queryParamsHandling: 'preserve' });
    }

    isValid(name: string): boolean {
        return (this.productForm.get(name).touched ||
            this.productForm.get(name).dirty) &&
            !this.productForm.get(name).valid;
    }

    //get(id: any): void {
    //    this.ps.getProduct(id)
    //        .subscribe(product => {
    //            this.product = product;
    //            console.log(this.product);
    //            console.log('Successfully read!');
    //        },
    //        error => this.errorMessage = <any>error);
    //}

    save() {
        console.log(this.productForm);
        console.log('Saved: ' + JSON.stringify(this.productForm.value));

        if (this.productForm.dirty && this.productForm.valid) {
            let p = Object.assign({}, this.product, this.productForm.value);

            console.log(p);
            this.put(p);
            // TODO Llamar a la lógica del negocio
            //this.productService.saveProduct(p)
            //    .subscribe(
            //    () => this.onSaveComplete(),
            //    (error: any) => this.errorMessage = <any>error
            //    );

        } else if (!this.productForm.dirty) {
            this.productForm.reset();
            //this.router.navigate(['/products']);
        }
    }

    put(p: any): void {
        this.ps.updateProduct(p)
            .subscribe(product => {
                this.saveSuccess = true;
                this.saveError = false;
                //this.product = product;
                console.log(this.product);
                this.modal.activate('Successfully edited!');
                console.log('Successfully edited!');
            },
            error => {
                this.errorMessage = <any>error;
                this.saveError = true;
                this.saveSuccess = false;
                this.modal.activate(this.errorMessage);
            });
    } 
}