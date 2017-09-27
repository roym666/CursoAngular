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
var modal_service_1 = require("../shared/modal/modal.service");
var HomeComponent = (function () {
    function HomeComponent(modal) {
        this.modal = modal;
    }
    HomeComponent.prototype.ngOnInit = function () {
        // this.modal.activate('app is ready');
    };
    HomeComponent = __decorate([
        core_1.Component({
            templateUrl: './home.component.html',
            providers: [modal_service_1.ModalService]
        }),
        __metadata("design:paramtypes", [modal_service_1.ModalService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map