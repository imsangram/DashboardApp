import { Component, OnInit } from '@angular/core';

import { AlertService } from '../_services/index';

@Component({
    moduleId: module.id,
    selector: 'my-alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent {
    message: string;
    constructor(private alertService: AlertService ) { }

    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }
}