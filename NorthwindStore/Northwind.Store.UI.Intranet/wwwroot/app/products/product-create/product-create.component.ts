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

@Component({
    templateUrl: './product-create.component.html',
    providers: [ProductService]
})
export class ProductCreateComponent implements OnInit {

    saveSuccess: boolean;
    saveError: boolean;
    product: Product = new Product();
    productForm: FormGroup;
    errorMessage: string;
    suppliers: Observable<Supplier[]>;
    categories: Observable<Category[]>;
    constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private ps: ProductService, private cs: CategoryService, private ss: SupplierService) { }

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
    }

    setModel(product: Product): void {
        if (this.productForm) {
            this.productForm.reset();
        }
        this.product = product;

        this.productForm.patchValue({
            productName: this.product.productName
        });

        //el set value obliga a poner todos los datos
        //this.productForm.setValue()
    }

    isValid(name: string): boolean {
        return (this.productForm.get(name).touched ||
            this.productForm.get(name).dirty) &&
            !this.productForm.get(name).valid;
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

    save() {
        console.log(this.productForm);
        console.log('Saved: ' + JSON.stringify(this.productForm.value));

        if (this.productForm.dirty && this.productForm.valid) {
            let p = Object.assign({}, this.product, this.productForm.value);

            console.log(p);
            this.post(p);
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

    post(p: any): void {

        this.ps.createProduct(p)
            .subscribe(product => {
                this.saveSuccess = true;
                this.saveError = false;
                this.product = product;
                console.log(this.product);
                console.log('Successfully create!');
            },
            error => {
                this.errorMessage = <any>error;
                this.saveError = true;
                this.saveSuccess = false;
            });
    }


    onBack(): void {

        // Ir a la vista inicial
        this.router.navigate(['/products'], { queryParamsHandling: 'preserve' });
    }
}