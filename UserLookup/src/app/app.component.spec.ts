import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { UserDisplayComponent } from './user-display/user-display.component';
import {
  HttpClientTestingModule,
} from "@angular/common/http/testing";
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared/shared.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        SharedModule
      ],
      declarations: [
        AppComponent,
        UserDisplayComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
