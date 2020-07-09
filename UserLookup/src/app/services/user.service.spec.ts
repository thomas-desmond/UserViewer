import { TestBed, getTestBed } from "@angular/core/testing";

import { UserService } from "./user.service";
import { User } from "../models/user.model";

import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { Constants } from '../shared/shared/constants';

describe("UserService", () => {
  let injector: TestBed;
  let service: UserService;
  let httpMock: HttpTestingController;

  let apiBaseUrl = 

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

  it("GetAllUsers should return all users", () => {
    const mockUserResponse = {
      data:[
        user1,
        user2,
      ]};

    service.getAllUsers().subscribe( (data: any) => {
      expect(data.data.length).toBe(2);
    });
    const req = httpMock.expectOne(Constants.userApiBaseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockUserResponse);
    httpMock.verify();
  });

  it('getUserBySearch should call GET with search terms', () => {
    service.getUsersBySearch("SearchTerm").subscribe();

    const req = httpMock.expectOne(Constants.userApiBaseUrl + '/search/SearchTerm');
    expect(req.request.method).toBe('GET');
  });

  it('removeUser should call DELETE with correct user id', () => {
    service.removeUser(99).subscribe();

    const req = httpMock.expectOne(Constants.userApiBaseUrl + '/99');
    expect(req.request.method).toBe('DELETE');
  });

  it('addNewUser should call POST with provided user data', () => {
    service.addNewUser(user1).subscribe();

    const req = httpMock.expectOne(Constants.userApiBaseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(user1);
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
