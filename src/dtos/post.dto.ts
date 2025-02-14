import { IsString, IsOptional, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MinLength(5)
  title: string;

  @IsString()
  @MinLength(10)
  content: string;
}

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  @MinLength(5)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  content?: string;
}
