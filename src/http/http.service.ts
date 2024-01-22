import { Injectable } from '@nestjs/common';
import { AxiosClientService } from '../services/axios-client/axios-client.service';
import { FetchClientService } from '../services/fetch-client/fetch-client.service';
import { HTTP_CLIENT_IMPLEMENTATION } from './http.config';
import * as CircularJSON from 'circular-json';
@Injectable()
export class HttpService {
  private readonly httpClient: any;

  constructor(
    private readonly axiosHttpClientService: AxiosClientService,
    private readonly fetchHttpClientService: FetchClientService,
  ) {
    this.httpClient =
    HTTP_CLIENT_IMPLEMENTATION === 'fetch' || HTTP_CLIENT_IMPLEMENTATION === 'axios'
    ? this.axiosHttpClientService
    : this.fetchHttpClientService;

  }
  async fetchData(url: string): Promise<any> {
    if (HTTP_CLIENT_IMPLEMENTATION === 'axios') {
      const axiosResponse = await this.axiosHttpClientService.get(url);
      return {
        client: 'axios',
        data: CircularJSON.stringify(axiosResponse.data),
      };
    } else if (HTTP_CLIENT_IMPLEMENTATION === 'fetch') {
      const fetchResponse = await this.fetchHttpClientService.get(url);
      return {
        client: 'fetch',
        data: CircularJSON.stringify(fetchResponse),
      };
    }
  }
  
}
