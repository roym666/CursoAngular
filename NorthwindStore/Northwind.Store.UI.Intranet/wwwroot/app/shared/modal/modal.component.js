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
var modal_service_1 = require("./modal.service");
var ModalComponent = (function () {
    function ModalComponent(modalService) {
        var _this = this;
        this.modalService = modalService;
        this.defaults = {
            title: '',
            message: 'Hello World'
        };
        this.modalSubscription = this.modalService.modalState.subscribe(function (modalMessage) {
            console.log("activiting modal: " + modalMessage.message);
            _this.activate(modalMessage.message);
        });
    }
    ModalComponent.prototype.activate = function (message, title) {
        if (message === void 0) { message = this.defaults.message; }
        if (title === void 0) { title = this.defaults.title; }
        this.title = title;
        this.message = message;
        this.show();
    };
    ModalComponent.prototype.ngOnInit = function () {
        this.modalElement = document.getElementById('my-modal');
    };
    ModalComponent.prototype.ngOnDestroy = function () {
        this.modalSubscription.unsubscribe();
    };
    ModalComponent.prototype.show = function () {
        $(this.modalElement).modal('show');
    };
    ModalComponent.prototype.hide = function () {
    };
    ModalComponent = __decorate([
        core_1.Component({
            selector: 'main-modal',
            templateUrl: './modal.component.html'
        }),
        __metadata("design:paramtypes", [modal_service_1.ModalService])
    ], ModalComponent);
    return ModalComponent;
}());
exports.ModalComponent = ModalComponent;
// http://deanmalone.net/post/using-jquery-from-angular2/ 
//# sourceMappingURL=modal.component.js.map