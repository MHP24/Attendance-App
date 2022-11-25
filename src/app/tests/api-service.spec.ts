import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { ApiService } from '../services/api.service';

describe('API Service', () => {
  let httpClient: HttpClient;
  let apiService: ApiService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    httpClient = TestBed.inject(HttpClient);
    apiService = new ApiService(httpClient);
  });

  it('Should exist ApiService', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));

  it('Should get all posts from API',  () => {
    expect(apiService.getPosts()).not.toBeNull()
  });

  it('Should get all users from API',  () => {
    expect(apiService.getUsers()).not.toBeNull()
  });

});