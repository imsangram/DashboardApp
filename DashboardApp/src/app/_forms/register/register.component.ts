﻿import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../../_services/index';

@Component({
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})

export class RegisterComponent {
    model: any = {};
    loading = false;
    error: string;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    debugger;
                    this.error = error._body;
                    this.loading = false;
                });
    }
    login() {
        return true;
    }
}
