import mongoose from 'mongoose';

export const dresseurSchema = new mongoose.Schema({
  nom: String,
  age: 'Int32',
  pokemons: [new mongoose.Schema({
    nom: String,
    niveau: 'Int32',
    race: { type: 'ObjectId', ref: 'pokemon' }
  })]
}, { collection: 'dresseurs' });