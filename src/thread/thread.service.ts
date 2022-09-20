import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  ThreadBodyDto,
  ThreadReturnDto,
  VoteStatusNeutral
} from './thread_dto';

@Injectable()
export class ThreadService {
  constructor(private prisma: PrismaService) {}

  async createThread(
    threadBodyDto: ThreadBodyDto,
    author: User
  ): Promise<ThreadReturnDto> {
    const thread = await this.prisma.thread.create({
      data: {
        title: threadBodyDto.title,
        description: threadBodyDto.description,
        author: {
          connect: {
            id: author.id
          }
        }
      }
    });

    delete thread.authorId;

    const threadReturn: ThreadReturnDto = {
      ...thread,
      author,
      numberOfComments: 0,
      voteScore: 0,
      voteStatus: VoteStatusNeutral.neutral
    };

    return threadReturn;
  }

  // async getThreads(startIndex: number): Promise<[ThreadReturnDto]> {
  async getThreads(startIndex: number) {
    const threads = await this.prisma.thread.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return threads;
  }
}
