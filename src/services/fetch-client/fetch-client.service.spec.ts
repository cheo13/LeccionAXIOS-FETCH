import { Test, TestingModule } from '@nestjs/testing';
import { FetchClientService } from './fetch-client.service';

describe('FetchClientService', () => {
  let service: FetchClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FetchClientService],
    }).compile();

    service = module.get<FetchClientService>(FetchClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
