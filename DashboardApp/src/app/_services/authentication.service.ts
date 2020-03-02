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
        return this.http.post(this.config.herokuApiUrl + '/login', { email: username, password: password })
            .map((response: Response) => {
                //login successful if there's a jwt token in the response
                debugger;
                let jwt_token = response.json();
                var user = { user: null, token: jwt_token };
                if (jwt_token) {
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

    // setLogin(username: string) {
    //     localStorage.setItem('currentUser', JSON.stringify(username));
    //     this.signedIn.next(true);
    // }
}