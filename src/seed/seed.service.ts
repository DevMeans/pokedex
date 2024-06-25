import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { pokemonResponse } from './interfaces/pokemon-response.interface';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios; //TODO:Crea una dependecia no esta injectado

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}
  async executeSeed() {
    await this.pokemonModel.deleteMany({});
    const { data } = await this.axios.get<pokemonResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0',
    );
    let datamap = data.results.map(({ name, url }) => {
      const segment = url.split('/');
      const no = +segment[segment.length - 2];
      return {
        no: no,
        name: name,
      };
    });
    const inserts = await this.pokemonModel.insertMany(datamap);
    if(!inserts){
      return 'Error inesperado';
    }
    return 'Seed ejecutado'
   
  }
}
