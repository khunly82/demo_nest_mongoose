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
  Post, StreamableFile,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { ApiBody, ApiConsumes, ApiProduces, ApiResponse } from '@nestjs/swagger';
import { PokemonFormDto } from '../dto/pokemon-form.dto';
import { FormDataRequest } from 'nestjs-form-data';
import * as sharp from 'sharp';
import { PokemonIndexDto } from '../dto/pokemon-index.dto';
import { PokemonDetailsDto } from '../dto/pokemon-details.dto';
import { Pokemon } from '../models/pokemon.model';

@Controller('pokemon')
export class PokemonController {

  constructor(
    @Inject('POKEMON_MODEL') private pokemonModel: Model<Pokemon>,
  ) { }

  @ApiResponse({ type: [PokemonIndexDto] })
  @Get()
  async getPokemon() {
    return (await this.pokemonModel.find().sort({ numero: 1 }).exec())
      .map(p => new PokemonIndexDto(p));
  }

  @ApiBody({type: PokemonFormDto})
  @ApiConsumes('multipart/form-data')
  @FormDataRequest()
  @Post()
  async addPokemon(
    @Body() body: PokemonFormDto
  ) {
    const created = new this.pokemonModel({
      ...body,
      types: body.types.split(','),
      image: await sharp(body.image.buffer)
        .resize(500)
        .webp()
        .toBuffer()
    })
    try {
      return new PokemonDetailsDto(await created.save());
    }
    catch(error) {
      console.log(error);
      throw new BadRequestException(error.errmsg);
    }
  }

  @Delete(':numero')
  async deletePokemon(@Param('numero', ParseIntPipe) numero: number) {
    const deleted = await this.pokemonModel.findOneAndDelete({ numero: numero }).exec();
    if(!deleted) {
      throw new NotFoundException('Pokemon not found');
    }
    return new PokemonDetailsDto(deleted);
  }

  @ApiResponse({ type: PokemonDetailsDto })
  @Get(':numero')
  async getPokemonByNumero(@Param('numero', ParseIntPipe) numero: number) {
    const pokemon = await this.pokemonModel.findOne({ numero: numero }).exec();
    if(!pokemon){
      throw new NotFoundException('Pokemon not found');
    }
    return new PokemonDetailsDto(pokemon);
  }

  @ApiProduces('image/webp')
  @Get('image/:numero')
  async getImage(@Param('numero', ParseIntPipe)numero:number) {
    const buffer = await this.pokemonModel.findOne({ numero: numero }, { image: 1 }).exec();
    if(!buffer?.image){
      throw new NotFoundException('image not found');
    }
    return new StreamableFile(buffer.image, { type: 'image/webp' });
  }
}
