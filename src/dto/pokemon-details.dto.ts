import { PokemonIndexDto } from './pokemon-index.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Pokemon } from '../models/pokemon.model';

export class PokemonDetailsDto extends PokemonIndexDto {
  @ApiProperty()
  poids: number;
  @ApiProperty()
  taille: number;

  constructor(pokemon: Pokemon) {
    super(pokemon);
    this.poids = pokemon.poids;
    this.taille = pokemon.taille;
  }
}