import {
  Controller,
  Req,
  Post,
  UseGuards,
  Body,
  Get,
  Query
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { ThreadService } from './thread.service';
import { GetThreadsQueryDto, ThreadBodyDto } from './thread_dto';

@Controller('threads')
export class ThreadController {
  constructor(private threadService: ThreadService) {}

  @Get()
  getThreads(@Query() query: GetThreadsQueryDto) {
    return this.threadService.getThreads(query.startIndex);
  }

  @UseGuards(JwtGuard)
  @Post()
  postThread(@Body() body: ThreadBodyDto, @GetUser() user: User) {
    return this.threadService.createThread(body, user);
  }
}
