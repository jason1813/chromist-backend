import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

class PostCommentBodyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  text: string;
}

export { PostCommentBodyDto };
