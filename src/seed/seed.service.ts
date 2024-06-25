import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { pokemonResponse } from './interfaces/pokemon-response.interface';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios; //TODO:Crea una dependecia no esta injectado
  async executeSeed() {
    const { data } = await this.axios.get<pokemonResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0',
    );
    data.results.forEach(({name,url}) => {
      const segment =url.split('/');
      const no = +segment[segment.length-2]
      console.log({name,no})
    });
    return data.results;
  }
}
