import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ThreadBodyDto, ThreadReturnDto, UnformattedThreadDto, VoteStatus } from './thread_dto';

@Injectable()
export class ThreadService {
  constructor(private prisma: PrismaService) {}

  async createThread(threadBodyDto: ThreadBodyDto, author: User): Promise<ThreadReturnDto> {
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

  async getThreads(startIndex: number, userId?: number): Promise<ThreadReturnDto[]> {
    const threads = await this.prisma.thread.findMany({
      orderBy: {
        id: 'desc'
      },
      include: this.threadInclude,
      skip: startIndex,
      take: 25
    });

    const returnThreads: ThreadReturnDto[] = threads.map((thread) => {
      return this.formatThread(thread, userId);
    });

    return returnThreads;
  }

  async getThread(threadId: number, userId?: number): Promise<ThreadReturnDto> {
    const thread = await this.prisma.thread.findUnique({
      where: {
        id: threadId
      },
      include: this.threadInclude
    });

    return this.formatThread(thread, userId);
  }

  formatThread = (unformattedThread: UnformattedThreadDto, userId?: number): ThreadReturnDto => {
    const { authorId, votes, _count, ...threadStripped } = unformattedThread;

    let voteStatus: VoteStatus;
    if (userId === undefined) {
      voteStatus = VoteStatus.neutral;
    } else {
      const threadVote = unformattedThread.votes.find((x) => x.userId === userId);
      voteStatus = threadVote !== undefined ? threadVote.vote : VoteStatus.neutral;
    }

    const formattedThread: ThreadReturnDto = {
      ...threadStripped,
      numberOfComments: unformattedThread._count.comments,
      voteScore: unformattedThread.votes.reduce((sum, { vote }) => sum + vote, 0),
      voteStatus: voteStatus
    };
    return formattedThread;
  };

  threadInclude = {
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
  };
}
