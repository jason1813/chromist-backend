import { Body, Controller, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CommentService } from './comment.service';
import { PostCommentBodyDto } from './comment_dto/comment-request.dto';

@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @UseGuards(JwtGuard)
  @Post('/:commentId/replies')
  postReply(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() body: PostCommentBodyDto,
    @GetUser() user: User
  ) {
    return this.commentService.createReply(commentId, body.text, user);
  }
}
