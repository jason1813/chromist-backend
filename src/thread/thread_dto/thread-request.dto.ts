import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

class ThreadBodyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export { ThreadBodyDto };
