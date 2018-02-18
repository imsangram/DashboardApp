import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { AppConfig } from '../app.config';
import { BehaviorSubject } from "rxjs/Rx";

@Injectable()
export class AuthenticationService {

    private _isLoggedIn: boolean;
    private signedIn = new BehaviorSubject<boolean>(false);

    constructor(private http: Http, private config: AppConfig) {
        debugger;
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            this._isLoggedIn = true;
            this.signedIn.next(true);
        }
        else {
            this._isLoggedIn = false;
            this.signedIn.next(false);
        }
    }

    get isSignedIn() {
        return this.signedIn.asObservable();
    }

    login(username: string, password: string) {
        debugger;
        return this.http.post(this.config.apiUrl + '/users/authenticate', { username: username, password: password })
        .map((response: Response) => {
                //login successful if there's a jwt token in the response
                debugger;
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.signedIn.next(true);
                }
            })
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.signedIn.next(false);
    }

    setLogin(username: string){
        localStorage.setItem('currentUser', JSON.stringify(username));
        this.signedIn.next(true);
    }
}