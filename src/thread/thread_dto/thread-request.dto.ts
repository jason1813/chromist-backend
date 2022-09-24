import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

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

class GetThreadCommentsQueryDto {
  @IsString()
  startIndex: string = '0';
}

class PostCommentBodyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  text: string;
}

export { ThreadBodyDto, GetThreadsQueryDto, GetThreadCommentsQueryDto, PostCommentBodyDto };
