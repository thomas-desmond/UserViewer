import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.css']
})
export class UserDisplayComponent implements OnInit {

  searchForm: FormGroup;
  public userList$: Observable<User[]>;

  constructor(
    public userService: UserService, 
    private fb: FormBuilder,
    private router: Router) { 
    this.initializeForm();
  }

  ngOnInit() {
    this.userList$ = this.userService.getAllUsers();
  }

  initializeForm(): void {
    this.searchForm = this.fb.group({
      searchTerms: new FormControl('', Validators.required),
    });
  }

  handleFormSubmit(): void {
    // TODO: Do some form validation
    this.userList$ = this.userService.getUsersBySearch(this.searchForm.controls.searchTerms.value);
  }

  handleClearForm(): void {
    this.userList$ = this.userService.getAllUsers();
  }

  handleAddNewUser(): void {
    this.router.navigate(['/add-user']);
  }
}
