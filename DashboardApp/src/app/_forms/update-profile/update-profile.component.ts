import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../_services/alert.service';
import { UserService } from '../../_services/user.service';
import { FormGroup, FormControl, FormBuilder, NgForm } from '@angular/forms';
import { User } from '../../_models';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html'
})
export class UpdateProfileComponent implements OnInit {
  user: User;
  constructor(
    private alertService: AlertService,
    private userService: UserService) {
  }

  ngOnInit() {
    this.user = new User();
    this.populateUserDetails();
  }

  populateUserDetails() {
    debugger;
    const userObj = JSON.parse(localStorage.getItem('currentUser'));
    const obj = JSON.parse(atob(userObj.token.split('.')[1]));
    const id = obj._id;
    //this.user._id = id;

    this.userService.getById(id)
      .subscribe(user => {
        debugger;
        this.user = user;
        this.user.password = '';
      },
        (error) => {

        });
  }
  submitForm(myForm: NgForm) {
    if (myForm.value.firstName == '' || myForm.value.lastName == '') {
      this.alertService.error("please fill in firstname and lastname");
      return false;
    }
    this.userService.update(this.user)
      .subscribe((data) => {
        debugger;
      },
        (error) => {
          debugger;
        });
    this.alertService.success('data submitted');
    console.log(myForm.value);
  }
}
