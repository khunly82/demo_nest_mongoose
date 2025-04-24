import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsInt, IsNotEmpty, IsNumber, MaxLength, Min, MinLength } from 'class-validator';
import { HasMimeType, IsFile, MaxFileSize, MemoryStoredFile } from 'nestjs-form-data';

export class PokemonFormDto {
  @IsNotEmpty()
  @ApiProperty({ type: 'integer' })
  numero: number;

  @MinLength(2)
  @MaxLength(255)
  @IsNotEmpty()
  @ApiProperty()
  nom: string;

  @IsNotEmpty()
  @ApiProperty()
  types: string;

  @IsFile()
  @MaxFileSize(1024 * 1024 * 5)
  @HasMimeType(['image/*'])
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  image: MemoryStoredFile;

  @IsNotEmpty()
  @ApiProperty()
  poids: number;

  @IsNotEmpty()
  @ApiProperty()
  taille: number;
}