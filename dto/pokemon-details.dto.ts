import { PokemonIndexDto } from './pokemon-index.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PokemonDetailsDto extends PokemonIndexDto {
  @ApiProperty()
  poids: number;
  @ApiProperty()
  taille: number;

  constructor(pokemon: any) {
    super(pokemon);
    this.poids = pokemon.poids;
    this.taille = pokemon.taille;
  }
}