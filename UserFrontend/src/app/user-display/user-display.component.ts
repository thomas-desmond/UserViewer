import { Component, OnInit, Input } from "@angular/core";
import { UserService } from "../services/user.service";
import { Subject, Observable } from "rxjs";
import { User } from "../models/user.model";

@Component({
  selector: "app-user-display",
  templateUrl: "./user-display.component.html",
  styleUrls: ["./user-display.component.css"],
})
export class UserDisplayComponent implements OnInit {
  searchInProgress: boolean = false;
  public userListSubject$ = new Subject<User[]>();
  public userList: User[];
  public userList$ = new  Observable<User[]>();

  constructor(public userService: UserService) {}

  ngOnInit() {}

  handleRemove(userIdToRemove): void {
    this.userService.removeUser(userIdToRemove).subscribe((data) => {
      this.userList = this.userList.filter((d) => d.id !== userIdToRemove);
      this.userListSubject$.next(this.userList);
      this.userList$ = this.userListSubject$.asObservable();
    });
  }

  public handleNewUserList(newUserList$: Observable<User[]>) {
    console.log("TEST");
    this.userList$ = newUserList$;
  }

  public handleSearchInProgress(searchInProgressValue: boolean) {
    this.searchInProgress = searchInProgressValue;
  }
}
