import { Controller, Get } from '@nestjs/common';
import * as CircularJSON from 'circular-json';
import { HttpService } from '../http/http.service';
import { HTTP_CLIENT_IMPLEMENTATION } from './http.config';


@Controller()
export class HttpController {
  constructor(private readonly httpService: HttpService) {}

  @Get()
  async getData() {
    try {
      let responseData;

      if (HTTP_CLIENT_IMPLEMENTATION === 'axios') {
        const axiosResponse = await this.httpService.fetchData('https://rickandmortyapi.com/');
        responseData = {
          client: 'axios',
          data: CircularJSON.stringify(axiosResponse.data),
        };
      } else if (HTTP_CLIENT_IMPLEMENTATION === 'fetch') {
        const fetchData = await this.httpService.fetchData('https://rickandmortyapi.com/');
        responseData = {
          client: 'fetch',
          data: CircularJSON.stringify(fetchData),
        };
      } else {
        throw new Error('HTTP client not supported');
      }

      return responseData;
    } catch (error) {
      console.error('Error handling response:', error);
     
      return { error: 'Hubo un problema al manejar la respuesta.' };
    }
  }
}