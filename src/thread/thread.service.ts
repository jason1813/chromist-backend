import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { FormattedCommentDto } from 'src/comment/comment_dto/comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { formatComment } from 'src/utility/functions.utils';
import { ThreadBodyDto, ThreadReturnDto, VoteStatus } from './thread_dto';
import { formatThread } from './thread_utils/thread-functions.utils';

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
      return formatThread(thread, userId);
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

    return formatThread(thread, userId);
  }

  async getThreadComments(
    threadId: number,
    startIndex: number,
    userId?: number
  ): Promise<FormattedCommentDto[]> {
    const comments = await this.prisma.comment.findMany({
      where: {
        threadId: threadId
      },
      orderBy: {
        id: 'desc'
      },
      include: this.commentInclude,
      skip: startIndex,
      take: 20
    });

    const formattedComments: FormattedCommentDto[] = comments.map((comment) => {
      return formatComment(comment, userId);
    });

    return formattedComments;
  }

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

  commentInclude = {
    _count: {
      select: {
        replies: true
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
