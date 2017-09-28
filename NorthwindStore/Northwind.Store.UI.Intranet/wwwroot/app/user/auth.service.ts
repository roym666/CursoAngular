import { Injectable } from '@angular/core';

import { IUser } from './user';
import { ToastService } from '../shared/toast/toast.service';

@Injectable()
export class AuthService {
    currentUser: IUser;
    redirectUrl: string;

    constructor(private ts: ToastService) { }

    isLoggedIn(): boolean {
        return !!this.currentUser;
    }

    login(userName: string, password: string): void {
        if (!userName || !password) {
            this.ts.activate('Se requiere usuario y clave');
            return;
        }

        // Pruebas
        if (userName === 'admin') {
            this.currentUser = {
                id: 1,
                userName: userName,
                isAdmin: true
            };
            this.ts.activate('Admin login');
            return;
        }
        this.currentUser = {
            id: 2,
            userName: userName,
            isAdmin: false
        };
        this.ts.activate(`Usuario: ${this.currentUser.userName} conectado`);
    }

    logout(): void {
        this.currentUser = null;
    }
}
