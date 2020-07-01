import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { AddUserComponent } from './add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { routes } from '../app-routing.module';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule, 
        ReactiveFormsModule, 
        SharedModule, 
        RouterTestingModule.withRoutes(routes)],
      declarations: [AddUserComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate /home on back button press', fakeAsync(() => { 
    const location: Location = TestBed.inject(Location);
   
    component.handleBackButton();
    tick(); 
    
    expect(location.path()).toBe('/home'); 
  }));
});
