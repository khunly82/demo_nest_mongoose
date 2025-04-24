import { Controller, Get, Inject } from '@nestjs/common';
import { Model } from 'mongoose';

@Controller('pokemon')
export class PokemonController {

  constructor(
    @Inject('POKEMON_MODEL') private pokemonModel: Model<any>
  ) {
  }

  @Get()
  async getPokemon() {
    return await this.pokemonModel.find();
  }
}
