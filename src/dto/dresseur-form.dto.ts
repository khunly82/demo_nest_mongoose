import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DresseurFormDto {
  @ApiProperty()
  @IsNotEmpty()
  nom: string;
  @ApiProperty()
  @IsNotEmpty()
  age: number;
}