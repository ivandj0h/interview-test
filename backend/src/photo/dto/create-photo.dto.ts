import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePhotoDto {
  @IsString()
  @IsNotEmpty()
  filename: string;

  @IsString()
  @IsNotEmpty()
  filepath: string;

  @IsString()
  @IsOptional()
  description?: string;
}
