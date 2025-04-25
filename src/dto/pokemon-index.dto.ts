import { ApiProperty } from '@nestjs/swagger';
import { Pokemon } from '../models/pokemon.model';

export class PokemonIndexDto {
  @ApiProperty()
  numero: number;
  @ApiProperty()
  nom: string;
  @ApiProperty()
  types: string[];

  constructor(pokemon: Pokemon) {
    this.numero = pokemon.numero;
    this.nom = pokemon.nom;
    this.types = pokemon.types;
  }
}
