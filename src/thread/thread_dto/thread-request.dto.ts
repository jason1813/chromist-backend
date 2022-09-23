import { IsNotEmpty, IsString } from 'class-validator';

class ThreadBodyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

class GetThreadsQueryDto {
  @IsString()
  startIndex: string = '0';
}

export { ThreadBodyDto, GetThreadsQueryDto };
