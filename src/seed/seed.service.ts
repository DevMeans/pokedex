import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { pokemonResponse } from './interfaces/pokemon-response.interface';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
@Injectable()
export class SeedService {
  //TODO:Crea una dependecia no esta injectado

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}
  async executeSeed() {
    await this.pokemonModel.deleteMany({});
    const data = await this.http.get<pokemonResponse>(
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
    if (!inserts) {
      return 'Error inesperado';
    }
    return 'Seed ejecutado';
  }
}
