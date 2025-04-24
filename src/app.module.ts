import { Module } from '@nestjs/common';
import { TestController } from './controllers/test.controller';
import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';
import { pokemonSchema } from './schemas/pokemon.schema';
import { dresseurSchema } from './schemas/dresseur.schema';
import { PokemonController } from './controllers/pokemon.controller';

@Module({
  imports: [],
  controllers: [TestController, PokemonController],
  providers: [
    {
      provide: 'DB_CONNECTION',
      useFactory: () => {
        mongoose.connect('mongodb://localhost/exemple');
        return mongoose;
      }
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
