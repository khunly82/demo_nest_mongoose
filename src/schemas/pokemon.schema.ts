import mongoose from 'mongoose';

export const pokemonSchema = new mongoose.Schema({
  numero: { type: 'Int32' },
  nom: String,
  types: [{ type: String, enum: ['Eau', 'Normal', 'Feu', 'Plante', 'Poison', 'Fée', 'Combat', 'Roche', 'Electrik', 'Vol', 'Sol', 'Ténèbre', 'Spectre', 'Dragon', 'Glace'] }],
  image: 'Buffer',
  poids: Number,
  taille: Number
}, {
  collection: "pokemons",
  timestamps: false
}).index({ numero: 1 }, { unique: true });