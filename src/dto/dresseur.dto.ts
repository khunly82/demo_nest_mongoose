import { Dresseur, DresseurPokemon } from '../models/dresseur.model';
import { ApiProperty } from '@nestjs/swagger';

export class DresseurPokemonDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  nom: string;
  @ApiProperty()
  niveau: number;
  @ApiProperty()
  raceNumero: number;
  @ApiProperty()
  raceNom: string;

  constructor(pokemon: DresseurPokemon) {
    this.id = pokemon._id as string;
    this.nom = pokemon.nom;
    this.niveau = pokemon.niveau;
    this.raceNumero = pokemon.race['numero'];
    this.raceNom = pokemon.race['nom'];
  }
}

export class DresseurDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  nom: string;
  @ApiProperty()
  age: number;
  @ApiProperty({ type: [DresseurPokemonDto] })
  pokemons: DresseurPokemonDto[];

  constructor(dresseur: Dresseur) {
    this.id = dresseur._id as string;
    this.nom = dresseur.nom;
    this.age = dresseur.age;
    this.pokemons = dresseur.pokemons.map(p => new DresseurPokemonDto(p));
  }
}