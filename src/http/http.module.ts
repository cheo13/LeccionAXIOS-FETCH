// src/http/http.module.ts
import { Module } from '@nestjs/common';
import { AxiosClientService } from '../services/axios-client/axios-client.service';
import { FetchClientService } from '../services/fetch-client/fetch-client.service';
import { HttpService } from '../http/http.service';
import { HttpController } from './http.controller';

@Module({
  providers: [
    AxiosClientService,
    FetchClientService,
    HttpService,
  ],
  controllers: [HttpController],
  exports: [HttpService],
})
export class HttpModule {}
