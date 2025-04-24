import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsNotEmpty, MaxLength, Min, MinLength } from 'class-validator';

export class PokemonFormDto {
  @IsNotEmpty()
  @Min(1)
  @ApiProperty()
  numero: number;

  @MinLength(2)
  @MaxLength(255)
  @IsNotEmpty()
  @ApiProperty()
  nom: string;

  @IsNotEmpty()
  @ArrayMinSize(1)
  @ArrayMaxSize(2)
  @ApiProperty()
  types: string[];

  //image: string;

  @IsNotEmpty()
  @ApiProperty()
  poids: number;

  @IsNotEmpty()
  @ApiProperty()
  taille: number;
}