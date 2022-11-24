import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { DatabaseHandlerService } from '../services/database-handler.service';
describe('IssTrackingDataService', () => {
  let databaseService: DatabaseHandlerService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DatabaseHandlerService],
    });
    databaseService = TestBed.inject(DatabaseHandlerService);
  });

  it('Should create database service', inject([DatabaseHandlerService], (service: DatabaseHandlerService) => {
    expect(service).toBeTruthy();
  }));

  it('Should be empty', async () => {
    let a = await databaseService.selectUsers();
    expect(a).toEqual('{}');
  });
});