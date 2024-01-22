import { Injectable } from '@nestjs/common';

@Injectable()
export class FetchClientService {
  private readonly useFetch: boolean;

  constructor() {
    this.useFetch = true; 
  }

  async get(url: string): Promise<any> {
    if (this.useFetch) {
      const response = await fetch(url);

      if (response.ok) {
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
          // Si es JSON, parsear y devolver
          return response.json();
        } else {
          // Si no es JSON, devolver el contenido directo (puede ser HTML u otro tipo)
          return response.text();
        }
      } else {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }
    } else {
      // Lógica para otro cliente, si es necesario
      return null;
    }
  }
}
