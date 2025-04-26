import { Schema } from 'mongoose';

export const pokemonSchema = new Schema({
  numero: { type: 'Int32', required: true },
  nom: { type: String, required: true },
  types: [{
    type: String,
    enum: ['Eau', 'Normal', 'Feu', 'Plante', 'Poison', 'Fée', 'Combat', 'Roche', 'Electrik', 'Vol', 'Sol', 'Ténèbre', 'Spectre', 'Dragon', 'Glace'],
    required: true
  }],
  image: { type: 'Buffer', required: true },
  poids: { type: Number, required: true },
  taille: { type: Number, required: true },
}, {
  collection: "pokemons",
  timestamps: false
}).index({ numero: 1 }, { unique: true });