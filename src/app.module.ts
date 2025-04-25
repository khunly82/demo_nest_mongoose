import { Module } from '@nestjs/common';
import { TestController } from './controllers/test.controller';
import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';
import { pokemonSchema } from './schemas/pokemon.schema';
import { dresseurSchema } from './schemas/dresseur.schema';
import { PokemonController } from './controllers/pokemon.controller';
import * as process from 'node:process';
import { ConfigModule } from '@nestjs/config';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { DresseurController } from './controllers/dresseur.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    NestjsFormDataModule,
  ],
  controllers: [TestController, PokemonController, DresseurController],
  providers: [
    {
      provide: Connection,
      useFactory: async () => await mongoose.connect(process.env.MONGO_URI!)
    },
    {
      provide: 'POKEMON_MODEL',
      useFactory: (connection: Connection) => connection.model('pokemon', pokemonSchema),
      inject: [Connection]
    },
    {
      provide: 'DRESSEUR_MODEL',
      useFactory: (connection: Connection) => connection.model('dresseur', dresseurSchema),
      inject: [Connection]
    },
  ],
})
export class AppModule {}
