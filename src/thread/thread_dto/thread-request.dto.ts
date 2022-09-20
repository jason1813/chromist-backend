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
  startIndex: number;
}

export { ThreadBodyDto, GetThreadsQueryDto };
