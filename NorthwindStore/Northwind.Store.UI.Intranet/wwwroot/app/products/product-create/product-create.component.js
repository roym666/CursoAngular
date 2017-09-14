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
var forms_1 = require("@angular/forms");
var product_service_1 = require("../product.service");
require("rxjs/add/observable/of");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/operator/switchMap");
require("rxjs/add/operator/catch");
var ProductCreateComponent = (function () {
    function ProductCreateComponent(route, router, fb, ps) {
        this.route = route;
        this.router = router;
        this.fb = fb;
        this.ps = ps;
    }
    ProductCreateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.saveError = false;
        this.saveSuccess = false;
        this.productForm = this.fb.group({
            productName: ['', [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(3),
                    forms_1.Validators.maxLength(50)
                ]],
            supplierId: ['', [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(1),
                    forms_1.Validators.maxLength(3)
                ]],
            categoryId: ['', [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(1),
                    forms_1.Validators.maxLength(3)
                ]]
        });
        this.productForm.get('productName').valueChanges
            .subscribe(function (value) { return _this.setValidator(value); });
    };
    ProductCreateComponent.prototype.setModel = function (product) {
        if (this.productForm) {
            this.productForm.reset();
        }
        this.product = product;
        this.productForm.patchValue({
            productName: this.product.productName
        });
        //el set value obliga a poner todos los datos
        //this.productForm.setValue()
    };
    ProductCreateComponent.prototype.isValid = function (name) {
        return (this.productForm.get(name).touched ||
            this.productForm.get(name).dirty) &&
            !this.productForm.get(name).valid;
    };
    ProductCreateComponent.prototype.setValidator = function (value) {
        console.log("valor: " + value + "!");
        //const phoneControl = this.productForm.get('phone');
        //if (value === 'text') {
        //    phoneControl.setValidators(Validators.required);
        //} else {
        //    phoneControl.clearValidators();
        //}
        //phoneControl.updateValueAndValidity();
    };
    ProductCreateComponent.prototype.save = function () {
        console.log(this.productForm);
        console.log('Saved: ' + JSON.stringify(this.productForm.value));
        if (this.productForm.dirty && this.productForm.valid) {
            var p = Object.assign({}, this.product, this.productForm.value);
            console.log(p);
            this.post(p);
            // TODO Llamar a la lógica del negocio
            //this.productService.saveProduct(p)
            //    .subscribe(
            //    () => this.onSaveComplete(),
            //    (error: any) => this.errorMessage = <any>error
            //    );
        }
        else if (!this.productForm.dirty) {
            this.productForm.reset();
            //this.router.navigate(['/products']);
        }
    };
    ProductCreateComponent.prototype.post = function (p) {
        var _this = this;
        this.ps.createProduct(p)
            .subscribe(function (product) {
            _this.saveSuccess = true;
            _this.saveError = false;
            _this.product = product;
            console.log(_this.product);
            console.log('Successfully create!');
        }, function (error) {
            _this.errorMessage = error;
            _this.saveError = true;
            _this.saveSuccess = false;
        });
    };
    ProductCreateComponent.prototype.onBack = function () {
        // Ir a la vista inicial
        this.router.navigate(['/products'], { queryParamsHandling: 'preserve' });
    };
    ProductCreateComponent = __decorate([
        core_1.Component({
            templateUrl: './product-create.component.html',
            providers: [product_service_1.ProductService]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, forms_1.FormBuilder, product_service_1.ProductService])
    ], ProductCreateComponent);
    return ProductCreateComponent;
}());
exports.ProductCreateComponent = ProductCreateComponent;
//# sourceMappingURL=product-create.component.js.map