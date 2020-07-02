import { async, ComponentFixture, TestBed, tick, fakeAsync } from "@angular/core/testing";

import { UserDisplayComponent } from "./user-display.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { UserService } from "../services/user.service";
import { of } from "rxjs";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared/shared.module";
import { RouterTestingModule } from "@angular/router/testing";
import { routes } from '../app-routing.module';
import { Location } from '@angular/common';

class MockUserService {
  getAllUsers() {
    return of([]);
  }
  getUsersBySearch() {
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
      ],
      declarations: [UserDisplayComponent],
      providers: [
        { provide: UserService, useClass: MockUserService },
      ],
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

  it("should perform get all users on page initialization", () => {
    const mySpy = spyOn(component.userService, "getAllUsers").and.callThrough();

    component.ngOnInit();

    expect(mySpy).toHaveBeenCalledTimes(1);
  });

  // Look for way to test now that handleFormSubmit is wrapped in setTimeout
  xit("should perform user search when form submit button is clicked", () => {
    const mySpy = spyOn(
      component.userService,
      "getUsersBySearch"
    ).and.callThrough();

    component.handleFormSubmit();

    expect(mySpy).toHaveBeenCalledTimes(10);
  });

  it("should get all users when form clear button is clicked", () => {
    const mySpy = spyOn(component.userService, "getAllUsers").and.callThrough();

    component.handleClearForm();

    expect(mySpy).toHaveBeenCalledTimes(1);
  });

  it('should remove user when remove button clicked', () => {
    const mySpy = spyOn(component.userService, 'removeUser').and.callThrough();

    component.handleRemove(99);

    expect(mySpy).toHaveBeenCalledTimes(1);
    expect(mySpy).toHaveBeenCalledWith(99);
  });
  
  it('should navigate to addUser page on add new user button click', fakeAsync(() => { 
    const location: Location = TestBed.inject(Location);
   
    component.handleAddNewUser();
    tick(); 
    
    expect(location.path()).toBe('/add-user');
  }));
});
