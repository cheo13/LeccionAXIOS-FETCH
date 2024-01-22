// src/axios-http-client/axios-http-client.service.ts
import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class AxiosClientService {
  private readonly client: any;

  constructor() {
    this.client = axios;
  }

  async get(url: string): Promise<AxiosResponse> {
    return this.client.get(url);
  }
}
