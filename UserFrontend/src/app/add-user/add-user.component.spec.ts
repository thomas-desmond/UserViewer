import {
  async,
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from "@angular/core/testing";

import { AddUserComponent } from "./add-user.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared/shared.module";
import { RouterTestingModule } from "@angular/router/testing";
import { Location } from "@angular/common";
import { routes } from "../app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { UserService } from '../services/user.service';
import { of } from 'rxjs';

class MockUserService {
  addNewUser() {
    return of();
  }
}

describe("AddUserComponent", () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
      ],
      declarations: [AddUserComponent],
      providers: [
        {provide: UserService, useClass: MockUserService}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should navigate /home on back button press", fakeAsync(() => {
    const location: Location = TestBed.inject(Location);

    component.handleBackButton();
    tick();

    expect(location.path()).toBe("/home");
  }));

  const testCases = [
    { firstName: "", lastName: "Desmond", expectedFormInvalid: true },
    { firstName: "Thomas", lastName: "", expectedFormInvalid: true },
    { firstName: "Thomas", lastName: "Desmond", expectedFormInvalid: false },
  ];
  testCases.forEach((tc) => {
    it("should make add user form invalid if either first name or last name are missing", () => {
      component.addUserForm.controls.firstName.setValue(tc.firstName);
      component.addUserForm.controls.lastName.setValue(tc.lastName);

      expect(component.addUserForm.invalid).toBe(
        tc.expectedFormInvalid,
        `addUserForm invalid value should have been ${tc.expectedFormInvalid}`
      );
    });
  });

  it("should call add new user when save button is clicked", () => {
    const mySpy = spyOn(component.userService, 'addNewUser').and.callThrough();

    component.handleSaveNewUser();

    expect(mySpy).toHaveBeenCalledTimes(1);
  });

  it("getSelectedPictureIndex should return picture index of 1 if no picture has been selected", () => {
    component.addUserForm.controls.picture.setValue('');

    const actualPictureIndex = component.getSelectedPictureIndex();

    expect(actualPictureIndex).toBe(1);
  })

  it("getSelectedPictureIndex should return correct picture index if a picture has been selected", () => {
    component.addUserForm.controls.picture.setValue(5);

    const actualPictureIndex = component.getSelectedPictureIndex();

    expect(actualPictureIndex).toBe(5);
  })
});
