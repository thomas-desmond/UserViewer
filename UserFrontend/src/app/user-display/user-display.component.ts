import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.css']
})
export class UserDisplayComponent implements OnInit {

  searchForm: FormGroup;
  public userList$: Observable<User[]>;

  constructor(private userService: UserService, private fb: FormBuilder) { 
    this.initializeForm();
  }

  ngOnInit() {
    this.userList$ = this.userService.getAllUsers();
  }

  initializeForm(): void {
    this.searchForm = this.fb.group({
      searchTerms: new FormControl(''),
    });
  }

  handleFormSubmit(): void {
    console.log("HIT THE SUBMIT");
  }
}
