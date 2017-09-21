import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from './modal.service';

import { Subscription } from 'rxjs/Subscription'

declare var $: any;

@Component({
    selector: 'main-modal',
    templateUrl: './modal.component.html'
})
export class ModalComponent implements OnDestroy, OnInit {
    private defaults = {
        title: '',
        message: 'Hello World'
    };
    private modalElement: any;
    private modalSubscription: Subscription;

    title: string;
    message: string;

    constructor(private modalService: ModalService) {
        this.modalSubscription = this.modalService.modalState.subscribe((modalMessage) => {
            console.log(`activiting modal: ${modalMessage.message}`)
            this.activate(modalMessage.message);
        });
    }

    activate(message = this.defaults.message, title = this.defaults.title) {
        this.title = title;
        this.message = message;
        this.show();
    }

    ngOnInit() {
        this.modalElement = document.getElementById('my-modal');
    }

    ngOnDestroy() {
        this.modalSubscription.unsubscribe();
    }

    private show() {
        $(this.modalElement).modal('show');
    }

    private hide() {
    }
}

// http://deanmalone.net/post/using-jquery-from-angular2/