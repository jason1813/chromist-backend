import { Controller, Post, UseGuards, Body, Get, Query } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard, OptionalJwtAuthGuard } from '../auth/guard';
import { ThreadService } from './thread.service';
import { GetThreadsQueryDto, ThreadBodyDto } from './thread_dto';

@Controller('threads')
export class ThreadController {
  constructor(private threadService: ThreadService) {}

  @UseGuards(OptionalJwtAuthGuard)
  @Get()
  getThreads(@Query() query: GetThreadsQueryDto, @GetUser() user: User) {
    return this.threadService.getThreads(query.startIndex, user.id);
  }

  @UseGuards(JwtGuard)
  @Post()
  postThread(@Body() body: ThreadBodyDto, @GetUser() user: User) {
    return this.threadService.createThread(body, user);
  }
}
