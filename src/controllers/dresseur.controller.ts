import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { Dresseur } from '../models/dresseur.model';
import { DresseurDto } from '../dto/dresseur.dto';
import { ApiBody, ApiProduces, ApiResponse } from '@nestjs/swagger';
import { DresseurFormDto } from '../dto/dresseur-form.dto';
import { customAlphabet } from 'nanoid';
import { Pokemon } from '../models/pokemon.model';
import { DresseurAddPokemonFormDto } from '../dto/dresseur-add-pokemon-form.dto';

@Controller('dresseur')
export class DresseurController {

  constructor(
    @Inject('DRESSEUR_MODEL') private dresseurModel: Model<Dresseur>,
    @Inject('POKEMON_MODEL') private pokmeonModel: Model<Pokemon>,
  ) {}

  @ApiResponse({ type: DresseurDto })
  @ApiBody({type: DresseurFormDto})
  @Post()
  async register(@Body() body: DresseurFormDto) {
    const randomNom = customAlphabet('abcdefghijklmnopqrstuvwxyz', 8)();
    const randomNiveau = Math.ceil(Math.random() * 20);
    const randomPokemon = (await this.pokmeonModel.aggregate([{ $sample: { size: 1 } }]).exec())[0];
    const dresseur = {
      ...body,
      pokemons: [
        {
          nom: randomNom,
          niveau: randomNiveau,
          race: randomPokemon._id,
        }
      ]
    }
    const created = new this.dresseurModel(dresseur);
    await created.populate('pokemons.race');
    await created.save();
    return new DresseurDto(created);
  }

  @ApiResponse({ type: DresseurDto })
  @ApiBody({type: DresseurAddPokemonFormDto})
  @Patch(':id/pokemons/add')
  async addPokemon(@Param('id') id: string, @Body() body: DresseurAddPokemonFormDto) {
    const pokemon = await this.pokmeonModel.findOne({
      numero: body.race
    }).exec();
    if(!pokemon) {
      throw new BadRequestException('Pokemon race not found');
    }
    const updated = await this.dresseurModel.findOneAndUpdate({
      _id: new mongoose.Types.ObjectId(id),
    }, {
      $push: {
        pokemons: {
          nom: body.nom,
          niveau: body.niveau,
          race: pokemon._id,
        }
      }
    }, {
      new: true,
    })
    if(!updated) {
      throw new NotFoundException('Dresseur not found');
    }
    await updated.populate('pokemons.race');
    return new DresseurDto(updated);
  }

  @ApiResponse({ type: DresseurDto })
  @Get(':id')
  async getById(@Param('id') id: string) {
    const d = await this.dresseurModel.findOne({
      _id: new mongoose.Types.ObjectId(id),
    }).populate('pokemons.race').exec()
    if(!d) {
      throw new NotFoundException('Dresseur not found');
    }
    return new DresseurDto(d);
  }
}
