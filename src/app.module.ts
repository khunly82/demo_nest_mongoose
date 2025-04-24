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

@Module({
  imports: [
    ConfigModule.forRoot(),
    NestjsFormDataModule,
  ],
  controllers: [TestController, PokemonController],
  providers: [
    {
      provide: 'DB_CONNECTION',
      useFactory: async () => await mongoose.connect(process.env.MONGO_URI!)
    },
    {
      provide: 'POKEMON_MODEL',
      useFactory: (connection: Connection) => connection.model('pokemon', pokemonSchema),
      inject: ['DB_CONNECTION']
    },
    {
      provide: 'DRESSEUR_MODEL',
      useFactory: (connection: Connection) => connection.model('dresseur', dresseurSchema),
      inject: ['DB_CONNECTION']
    }
  ],
})
export class AppModule {}
