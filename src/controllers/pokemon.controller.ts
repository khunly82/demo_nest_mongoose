import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { ApiBody } from '@nestjs/swagger';
import { PokemonFormDto } from '../../dto/pokemon-form.dto';

@Controller('pokemon')
export class PokemonController {

  constructor(
    @Inject('POKEMON_MODEL') private pokemonModel: Model<any>
  ) { }

  @Get()
  async getPokemon() {
    return await this.pokemonModel.find().sort({ numero: 1 }).exec();
  }

  @ApiBody({type: PokemonFormDto})
  @Post()
  async addPokemon(
    @Body() body: PokemonFormDto
  ) {
    const created = new this.pokemonModel({
      ...body
    })
    try {
      return await created.save();
    }
    catch(error) {
      throw new BadRequestException(error.errmsg);
    }
  }

  @Delete(':numero')
  async deletePokemon(@Param('numero', ParseIntPipe) numero: number) {
    const deleted = await this.pokemonModel.findOneAndDelete({ numero: numero }).exec();
    if(!deleted) {
      throw new NotFoundException('Pokemon not found');
    }
    return deleted;
  }

  @Get(':numero')
  async getPokemonByNumero(@Param('numero', ParseIntPipe) numero: number) {
    const pokemon = await this.pokemonModel.findOne({ numero: numero }).exec();
    if(!pokemon){
      throw new NotFoundException('Pokemon not found');
    }
    return pokemon;
  }
}
