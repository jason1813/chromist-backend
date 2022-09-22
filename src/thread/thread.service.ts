import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ThreadBodyDto, ThreadReturnDto, VoteStatus } from './thread_dto';

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
      voteStatus: VoteStatus.neutral
    };

    return threadReturn;
  }

  async getThreads(startIndex: number, userId?: number) {
    const threads = await this.prisma.thread.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        _count: {
          select: {
            comments: true
          }
        },
        votes: {
          select: { vote: true, userId: true }
        },
        author: {
          select: {
            id: true,
            username: true
          }
        }
      }
    });

    const returnThread: ThreadReturnDto[] = threads.map((thread) => {
      const { authorId, votes, _count, ...threadStripped } = thread;
      const returnThread: ThreadReturnDto = {
        ...threadStripped,
        numberOfComments: thread._count.comments,
        voteScore: thread.votes.reduce((sum, { vote }) => sum + vote, 0),
        voteStatus:
          userId === undefined
            ? VoteStatus.neutral
            : thread.votes.find((x) => x.userId === userId).vote
      };
      return returnThread;
    });

    return returnThread;
  }
}
