import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

class PostCommentBodyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(6000)
  text: string;
}

export { PostCommentBodyDto };
