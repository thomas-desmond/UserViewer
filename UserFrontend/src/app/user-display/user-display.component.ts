import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.css']
})
export class UserDisplayComponent implements OnInit {

  public userList$: Observable<User[]>;

  constructor(private userService: UserService) { 
  }

  ngOnInit() {
    this.userList$ = this.userService.getAllUsers();
  }
}
