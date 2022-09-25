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

class GetThreadsQueryDto {
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  startIndex: number = 0;
}

class GetThreadCommentsQueryDto {
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  startIndex: number = 0;
}

class PostCommentBodyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  text: string;
}

export { ThreadBodyDto, GetThreadsQueryDto, GetThreadCommentsQueryDto, PostCommentBodyDto };
