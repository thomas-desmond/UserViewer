import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDisplayComponent } from './user-display.component';
import {
  HttpClientTestingModule,
} from "@angular/common/http/testing";
import { UserService } from '../services/user.service';
import { of, } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared/shared.module';

class MockUserService {
  getAllUsers() {
    return of([])
  }
  getUsersBySearch() {
    return of([]);
  }
}

describe('UserDisplayComponent', () => {
  let component: UserDisplayComponent;
  let fixture: ComponentFixture<UserDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, SharedModule],
      declarations: [UserDisplayComponent],
      providers: [{ provide: UserService, useClass: MockUserService }]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should perform get all users on page initialization', () => {
    const mySpy = spyOn(component.userService, "getAllUsers").and.callThrough();

    component.ngOnInit();

    expect(mySpy).toHaveBeenCalledTimes(1);
  })

  // Look for way to test now that handleFormSubmit is wrapped in setTimeout
  xit('should perform user search when form submit button is clicked', () => {
    const mySpy = spyOn(component.userService, "getUsersBySearch").and.callThrough();

    component.handleFormSubmit();

    expect(mySpy).toHaveBeenCalledTimes(10);
  });

  it('should get all users when form clear button is clicked', () => {
    const mySpy = spyOn(component.userService, "getAllUsers").and.callThrough();

    component.handleClearForm();

    expect(mySpy).toHaveBeenCalledTimes(1);
  })
});
