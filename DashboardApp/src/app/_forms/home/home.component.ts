import { Component, OnInit } from '@angular/core';

import { User } from '../../_models/index';
import { UserService, AlertService } from '../../_services/index';

@Component({
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(private userService: UserService, private alertService: AlertService) {
        //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id)
            .subscribe(() => {
                this.loadAllUsers()
            });
    }

    private loadAllUsers() {
        debugger
        this.userService.getAll()
            .subscribe(users => {
                debugger;
                this.users = users;
            });
    }

    testClick() {
        this.alertService.error('Test message');
    }
}