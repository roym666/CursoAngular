import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export interface ModalMessage {
    message: string
}

@Injectable()
export class ModalService {
    private modalSubject = new Subject<ModalMessage>();

    modalState = this.modalSubject.asObservable();

    constructor( @Optional() @SkipSelf() prior: ModalService) {
        if (prior) {
            console.log('modal service already exists');
            return prior;
        } else {
            console.log('created modal service')
        }
    }

    activate(message?: string) {
        this.modalSubject.next(<ModalMessage>{ message: message });
    }
}
