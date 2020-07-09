import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../services/user.service";
import { Observable, Subject, throwError } from "rxjs";
import { User } from "../models/user.model";
import { catchError } from "rxjs/operators";


@Component({
  selector: "app-user-search",
  templateUrl: "./user-search.component.html",
  styleUrls: ["./user-search.component.css"],
})
export class UserSearchComponent implements OnInit {
  @Output() newUserList = new EventEmitter<Observable<User[]>>();
  @Output() searchInProgress = new EventEmitter<boolean>();
  userListSubject$ = new Subject<User[]>();

  searchForm: FormGroup;

  // TODO: Remove?
  public userList$: Observable<User>;
  // searchInProgress: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    this.userService.getAllUsers().subscribe((data) => {
      console.log(data);
      this.userListSubject$.next(data);
      this.newUserList.emit(this.userListSubject$.asObservable());
    });
  }

  initializeForm(): void {
    this.searchForm = this.fb.group({
      searchTerms: new FormControl("", [
        Validators.required,
        this.whiteSpaceOnlyValidator,
      ]),
    });
  }

  handleFormSubmit(): void {
    this.userList$ = null;
    this.searchInProgress.emit(true);
    setTimeout(
      function () {
        this.userService
          .getUsersBySearch(this.searchForm.controls.searchTerms.value)
          .pipe(
            catchError((err) => {
              return throwError(err);
            })
          )
          .subscribe((data) => {
            this.userListSubject$.next(data);
            this.newUserList.emit(this.userListSubject$.asObservable());
          });
        this.searchInProgress.emit(false);
      }.bind(this),
      2000
    );
  }

  handleClearForm(): void {
    this.searchForm.controls.searchTerms.setValue("");
    this.searchForm.controls.searchTerms.setErrors({});

    // TODO: Extract to method
    this.userService.getAllUsers().subscribe((data) => {
      this.userListSubject$.next(data);
      this.newUserList.emit(this.userListSubject$.asObservable());
    });
  }
  handleAddNewUser(): void {
    this.router.navigate(["/add-user"]);
  }

  public whiteSpaceOnlyValidator(control: FormControl) {
    const isWhitespace = (control.value || "").trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }
}
