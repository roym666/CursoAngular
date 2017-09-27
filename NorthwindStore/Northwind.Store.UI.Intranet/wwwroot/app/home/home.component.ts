import { Component, OnInit } from '@angular/core';
import { ModalService } from '../shared/modal/modal.service';

@Component({
    templateUrl: './home.component.html',
    providers: [ModalService]
})
export class HomeComponent implements OnInit {
    constructor(private modal: ModalService) { }

    ngOnInit(): void {
       // this.modal.activate('app is ready');
    }
}