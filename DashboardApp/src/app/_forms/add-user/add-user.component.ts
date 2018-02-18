import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../_services/alert.service';
import { FormGroup, FormControl, FormBuilder, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  constructor(private alertService: AlertService) { 
  }

  ngOnInit() {
  }
 
  submitForm(myForm: NgForm){
    debugger;
    if(myForm.value.firstName == '' || myForm.value.lastName == ''){
      this.alertService.error("please fill in firstname and lastname");
      return false;
    }
    this.alertService.success('data submitted');
    console.log(myForm.value);
  }
}
