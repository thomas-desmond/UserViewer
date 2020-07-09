import {
  async,
  ComponentFixture,
  TestBed,
} from "@angular/core/testing";

import { UserDisplayComponent } from "./user-display.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { UserService } from "../services/user.service";
import { of } from "rxjs";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared/shared.module";
import { RouterTestingModule } from "@angular/router/testing";
import { routes } from "../app-routing.module";
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from "@angular/platform-browser/animations";
import { UserSearchComponent } from '../user-search/user-search.component';

class MockUserService {
  getAllUsers() {
    return of([]);
  }
  removeUser() {
    return of();
  }
}

describe("UserDisplayComponent", () => {
  let component: UserDisplayComponent;
  let fixture: ComponentFixture<UserDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterTestingModule.withRoutes(routes),
        NoopAnimationsModule,
      ],
      declarations: [UserDisplayComponent, UserSearchComponent],
      providers: [{ provide: UserService, useClass: MockUserService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should remove user when remove button clicked", () => {
    const mySpy = spyOn(component.userService, "removeUser").and.callThrough();

    component.handleRemove(99);

    expect(mySpy).toHaveBeenCalledTimes(1);
    expect(mySpy).toHaveBeenCalledWith(99);
  });


});
