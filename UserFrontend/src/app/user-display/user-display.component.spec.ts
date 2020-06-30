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
  let userService: UserService;

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

  it('should delete customer feed', () => {
    const mySpy = spyOn(component.userService, "getUsersBySearch").and.callThrough();

    component.handleFormSubmit();

    expect(mySpy).toHaveBeenCalledTimes(1);
  });
});
