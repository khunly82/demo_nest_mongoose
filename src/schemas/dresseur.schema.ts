import { Schema } from 'mongoose';

export const dresseurSchema = new Schema({
  nom: { type: String, required: true },
  age: { type: 'Int32', required: true },
  pokemons: [{ type: new Schema({
    nom: { type: String, required: true },
    niveau: { type: 'Int32', required: true },
    race: { type: 'ObjectId', ref: 'pokemon', required: true }
  }), required: true }]
}, { collection: 'dresseurs', timestamps: true });