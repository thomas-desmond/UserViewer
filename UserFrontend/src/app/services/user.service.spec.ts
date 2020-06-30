import { TestBed, getTestBed } from "@angular/core/testing";

import { UserService } from "./user.service";
import { User } from "../models/user.model";

import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";

describe("UserService", () => {
  let injector: TestBed;
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    injector = getTestBed();
    service = injector.get(UserService);
    httpMock = injector.get(HttpTestingController);
  });

  it("should be created", () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it("should return user data on GetAllUsers", () => {
    const mockUserResponse = {
      data:[
        user1,
        user2,
      ]};

    service.getAllUsers().subscribe( (data: any) => {
      expect(data.data.length).toBe(2);
    });
    const req = httpMock.expectOne('https://localhost:44308/api/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUserResponse);
    httpMock.verify();

  });
});

const user1: User = {
  id: 1,
  firstName: "Thomas",
  lastName: "Desmond",
  address: "123 Main St",
  age: 0,
  interests: "Hiking, Motorcycle, Geocaching",
  picture: "fakePath/image1.png",
};

const user2: User = {
  id: 1,
  firstName: "John",
  lastName: "Smith",
  address: "456 Main St",
  age: 0,
  interests: "Jogging, Video Games, Deep Sea Diving",
  picture: "fakePath/image2.png",
};
