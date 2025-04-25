import { Document } from 'mongoose';

export class Pokemon extends Document{
  numero: number;
  nom: string;
  image: Buffer;
  types: string[];
  poids: number;
  taille: number;
}