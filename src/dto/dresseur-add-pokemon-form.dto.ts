import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class DresseurAddPokemonFormDto {
  @ApiProperty()
  @IsNotEmpty()
  nom: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  niveau: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  race: number;
}