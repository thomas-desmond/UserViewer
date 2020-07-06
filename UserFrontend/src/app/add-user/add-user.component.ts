import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addUserForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public userService: UserService) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.addUserForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      address: new FormControl(''),
      age: new FormControl('', Validators.min(0)),
      interests: new FormControl(''),
      picture: new FormControl('')
    })
  }

  handleSaveNewUser() {
    const selectedPictureIndex = this.getSelectedPictureIndex();
    this.addUserForm.controls.picture.setValue(`https://user-images-temp.s3.amazonaws.com/face${selectedPictureIndex}.jpg`);
    this.userService.addNewUser(new User(this.addUserForm.value)).subscribe(() => {
      this.router.navigate(['']);
    });
  }

  public getSelectedPictureIndex(): number {
    let selectedPictureIndex = this.addUserForm.controls.picture.value;
    if (!selectedPictureIndex) {
      selectedPictureIndex = 1;
    }
    return selectedPictureIndex;
  }

  handleBackButton() {
    this.router.navigate(['']);
  }
}
