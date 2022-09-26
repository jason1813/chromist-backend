import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard, OptionalJwtAuthGuard } from 'src/auth/guard';
import { PostVoteStatusDto, QueryStartIndexDto } from 'src/utility/request.utils.dto';
import { CommentService } from './comment.service';
import { PostCommentBodyDto } from './comment_dto/comment-request.dto';

@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @UseGuards(OptionalJwtAuthGuard)
  @Get('/:commentId/replies')
  getReplies(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Query() query: QueryStartIndexDto,
    @GetUser() user: User
  ) {
    return this.commentService.getReplies(commentId, query.startIndex, user.id);
  }

  @UseGuards(JwtGuard)
  @Post('/:commentId/replies')
  postReply(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() body: PostCommentBodyDto,
    @GetUser() user: User
  ) {
    return this.commentService.createReply(commentId, body.text, user);
  }

  @UseGuards(JwtGuard)
  @Post('/:commentId/vote')
  @HttpCode(204)
  postVoteStatusOnComment(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() body: PostVoteStatusDto,
    @GetUser() user: User
  ) {
    return this.commentService.voteOnComment(commentId, body.voteStatus, user);
  }
}
