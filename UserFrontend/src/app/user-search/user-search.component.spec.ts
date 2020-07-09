import { async, ComponentFixture, TestBed, tick, fakeAsync } from "@angular/core/testing";
import { Location } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { UserSearchComponent } from "./user-search.component";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from '../shared/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../app-routing.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from '../services/user.service';
import { of } from 'rxjs';

describe("UserSearchComponent", () => {
  let component: UserSearchComponent;
  let fixture: ComponentFixture<UserSearchComponent>;
  class MockUserService {
    getAllUsers() {
      return of([]);
    }
    getUsersBySearch() {
      return of([]);
    }
  }

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
      declarations: [UserSearchComponent],
      providers: [{ provide: UserService, useClass: MockUserService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it("should create", () => {
    expect(component).toBeTruthy();
  });

  // Look for way to test now that handleFormSubmit is wrapped in setTimeout
  xit("should perform user search when form submit button is clicked", () => {
    const mySpy = spyOn(
      component.userService,
      "getUsersBySearch"
    ).and.callThrough();

    component.handleFormSubmit();

    expect(mySpy).toHaveBeenCalledTimes(2);
  });

  it("should be invalid when search terms are only whitespace", () => {
    component.searchForm.controls.searchTerms.setValue("     ");

    expect(component.searchForm.invalid).toBeTruthy(
      "Search form should be invalid"
    );
    expect(
      component.searchForm.controls.searchTerms.hasError("whitespace")
    ).toBeTruthy("Search Term control should have the whitespace error");
  });

  it("should be invalid when there are no search terms", () => {
    component.searchForm.controls.searchTerms.setValue("");

    expect(component.searchForm.invalid).toBeTruthy(
      "Search form should be invalid"
    );
  });

  it("should navigate to addUser page on add new user button click", fakeAsync(() => {
    const location: Location = TestBed.inject(Location);

    component.handleAddNewUser();
    tick();

    expect(location.path()).toBe("/add-user");
  }));

  const testCases = [
    { searchTerm: "Thomas" },
    { searchTerm: "Thomas Desmond" },
    { searchTerm: "   Thomas   " },
  ];
  testCases.forEach((tc) => {
    it("should be valid when there are search terms", () => {
      component.searchForm.controls.searchTerms.setValue(tc.searchTerm);

      expect(component.searchForm.valid).toBeTruthy(
        `Search form should be valid with search term ${tc.searchTerm}`
      );
    });
  });

  it("should get all users when form clear button is clicked", () => {
    const mySpy = spyOn(component.userService, "getAllUsers").and.callThrough();

    component.handleClearForm();

    expect(mySpy).toHaveBeenCalledTimes(1);
  });

  it("should clear search form and errors when clear button is clicked", () => {
    component.searchForm.controls.searchTerms.setValue("    ");

    component.handleClearForm();

    expect(component.searchForm.controls.searchTerms.value).toBe("");
    expect(component.searchForm.controls.searchTerms.invalid).toBeTruthy();
  });

  
  it("should perform get all users on page initialization", () => {
    const mySpy = spyOn(component.userService, "getAllUsers").and.callThrough();

    component.ngOnInit();

    expect(mySpy).toHaveBeenCalledTimes(1);
  });
});
