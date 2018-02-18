import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'my-header',
    templateUrl: 'header.component.html'
})

export class HeaderComponent {
    clicked(event:any) {
        if(event.currentTarget.classList.contains('open')){
            event.currentTarget.classList.remove('open')
        }
        else {
            event.currentTarget.classList.add('open')
        }
        return false;
    }
}