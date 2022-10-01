import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Query,
  Param,
  HttpCode,
  ParseIntPipe
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PostCommentBodyDto } from 'src/comment/comment_dto/comment-request.dto';
import { PostVoteStatusDto, QueryStartIndexDto } from 'src/utility/request.utils.dto';
import { GetUser } from '../auth/decorator';
import { JwtGuard, OptionalJwtAuthGuard } from '../auth/guard';
import { ThreadService } from './thread.service';
import { ThreadBodyDto } from './thread_dto';

@Controller('threads')
export class ThreadController {
  constructor(private threadService: ThreadService) {}

  @UseGuards(OptionalJwtAuthGuard)
  @Get()
  getThreads(@Query() query: QueryStartIndexDto, @GetUser() user: User) {
    return this.threadService.getThreads(query.startIndex, user.id);
  }

  @UseGuards(JwtGuard)
  @Post()
  postThread(@Body() body: ThreadBodyDto, @GetUser() user: User) {
    return this.threadService.createThread(body, user);
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Get('/:threadId')
  getThread(@Param('threadId', ParseIntPipe) threadId: number, @GetUser() user: User) {
    return this.threadService.getThread(threadId, user.id);
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Get('/:threadId/comments')
  getThreadComments(
    @Param('threadId', ParseIntPipe) threadId: number,
    @Query() query: QueryStartIndexDto,
    @GetUser() user: User
  ) {
    return this.threadService.getThreadComments(threadId, query.startIndex, user.id);
  }

  @UseGuards(JwtGuard)
  @Post('/:threadId/comments')
  postCommentOnThread(
    @Param('threadId', ParseIntPipe) threadId: number,
    @Body() body: PostCommentBodyDto,
    @GetUser() user: User
  ) {
    return this.threadService.createCommentOnThread(threadId, body.text, user);
  }

  @UseGuards(JwtGuard)
  @Post('/:threadId/vote')
  @HttpCode(204)
  postVoteStatusOnThread(
    @Param('threadId', ParseIntPipe) threadId: number,
    @Body() body: PostVoteStatusDto,
    @GetUser() user: User
  ) {
    return this.threadService.voteOnThread(threadId, body.voteStatus, user);
  }
}
