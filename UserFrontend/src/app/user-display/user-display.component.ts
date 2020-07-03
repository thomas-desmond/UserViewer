import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable, throwError, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import {  HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.css']
})
export class UserDisplayComponent implements OnInit {

  searchInProgress = false;
  errorObject: HttpErrorResponse
  searchForm: FormGroup;
  public userListSubject$ = new Subject();
  public userList: User[];
  public userList$ = this.userListSubject$.asObservable();
  public millisecondsToShowSpinner: number = 2000;

  constructor(
    public userService: UserService, 
    private fb: FormBuilder,
    private router: Router) { 
    this.initializeForm();
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(data => {
      this.userList = data;
      this.userListSubject$.next(this.userList);
    });
  }

  initializeForm(): void {
    this.searchForm = this.fb.group({
      searchTerms: new FormControl('', [Validators.required, this.whiteSpaceOnlyValidator])
    });
  }
  public whiteSpaceOnlyValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  handleFormSubmit(): void {
    // TODO: Do some form validation
    this.userList$ = null;
    this.searchInProgress = true;
    setTimeout(function(){ 
      this.userList$ = this.userService.getUsersBySearch(this.searchForm.controls.searchTerms.value)
        .pipe(catchError(err => {
          this.errorObject = err;
          return throwError(err);
        }));
      this.searchInProgress = false;
    }.bind(this), this.millisecondsToShowSpinner);
  }

  handleClearForm(): void {
    this.searchForm.controls.searchTerms.setValue('');
    this.searchForm.controls.searchTerms.setErrors(null);
    this.userList$ = this.userService.getAllUsers();
  }

  handleAddNewUser(): void {
    this.router.navigate(['/add-user']);
  }

  handleRemove(userIdToRemove): void {
    this.userService.removeUser(userIdToRemove).subscribe((data) => {
      this.userList = this.userList.filter(d => d.id !== userIdToRemove);
      this.userListSubject$.next(this.userList);
    });
  }
}
