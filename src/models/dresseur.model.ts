import { ObjectId, Document } from 'mongoose';

export interface Dresseur extends Document {
  nom: string;
  age: number;
  pokemons: DresseurPokemon[];
}

export interface DresseurPokemon extends Document {
  nom: string;
  niveau: number;
  race: ObjectId
}