import { ApiProperty } from '@nestjs/swagger';

export class PokemonIndexDto {
  @ApiProperty()
  numero: number;
  @ApiProperty()
  nom: string;
  @ApiProperty()
  types: string[];

  constructor(pokemon: any) {
    this.numero = pokemon.numero;
    this.nom = pokemon.nom;
    this.types = pokemon.types;
  }
}
