import { Controller, Post, UseGuards, Body, Get, Query, Param } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard, OptionalJwtAuthGuard } from '../auth/guard';
import { ThreadService } from './thread.service';
import {
  GetThreadCommentsQueryDto,
  GetThreadsQueryDto,
  PostCommentBodyDto,
  ThreadBodyDto
} from './thread_dto';

@Controller('threads')
export class ThreadController {
  constructor(private threadService: ThreadService) {}

  @UseGuards(OptionalJwtAuthGuard)
  @Get()
  getThreads(@Query() query: GetThreadsQueryDto, @GetUser() user: User) {
    return this.threadService.getThreads(+query.startIndex, user.id);
  }

  @UseGuards(JwtGuard)
  @Post()
  postThread(@Body() body: ThreadBodyDto, @GetUser() user: User) {
    return this.threadService.createThread(body, user);
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Get('/:id')
  getThread(@Param('id') id, @GetUser() user: User) {
    return this.threadService.getThread(+id, user.id);
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Get('/:id/comments')
  getThreadComments(
    @Param('id') id,
    @Query() query: GetThreadCommentsQueryDto,
    @GetUser() user: User
  ) {
    return this.threadService.getThreadComments(+id, +query.startIndex, user.id);
  }

  @UseGuards(JwtGuard)
  @Post('/:id/comments')
  postCommentOnThread(
    @Param('id') threadId,
    @Body() body: PostCommentBodyDto,
    @GetUser() user: User
  ) {
    return this.threadService.createCommentOnThread(+threadId, body.text, user);
  }
}
