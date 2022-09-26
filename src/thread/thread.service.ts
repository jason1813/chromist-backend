import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { FormattedCommentDto } from 'src/comment/comment_dto/comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { formatComment } from 'src/utility/functions.utils';
import { commentInclude } from 'src/utility/objects.utils';
import { ThreadBodyDto, FormattedThreadDto, VoteStatus } from './thread_dto';
import { formatThread } from './thread_utils/thread-functions.utils';

@Injectable()
export class ThreadService {
  constructor(private prisma: PrismaService) {}

  async createThread(threadBodyDto: ThreadBodyDto, author: User): Promise<FormattedThreadDto> {
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

    const threadReturn: FormattedThreadDto = {
      ...thread,
      author,
      numberOfComments: 0,
      voteScore: 0,
      voteStatus: VoteStatus.neutral
    };

    return threadReturn;
  }

  async getThreads(startIndex: number, userId?: number): Promise<FormattedThreadDto[]> {
    const threads = await this.prisma.thread.findMany({
      orderBy: {
        id: 'desc'
      },
      include: this.threadInclude,
      skip: startIndex,
      take: 25
    });

    const returnThreads: FormattedThreadDto[] = threads.map((thread) => {
      return formatThread(thread, userId);
    });

    return returnThreads;
  }

  async getThread(threadId: number, userId?: number): Promise<FormattedThreadDto> {
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
      include: commentInclude,
      skip: startIndex,
      take: 20
    });

    const formattedComments: FormattedCommentDto[] = comments.map((comment) => {
      return formatComment(comment, userId);
    });

    return formattedComments;
  }

  async createCommentOnThread(
    threadId: number,
    text: string,
    author: User
  ): Promise<FormattedCommentDto> {
    const comment = await this.prisma.comment.create({
      data: {
        text: text,
        thread: {
          connect: {
            id: threadId
          }
        },
        author: {
          connect: {
            id: author.id
          }
        }
      }
    });

    delete comment.authorId;

    const formattedComment: FormattedCommentDto = {
      ...comment,
      author,
      numberOfReplies: 0,
      voteScore: 0,
      voteStatus: VoteStatus.neutral
    };

    return formattedComment;
  }

  async voteOnThread(threadId: number, voteStatus: VoteStatus, user: User): Promise<string> {
    await this.prisma.threadVote.create({
      data: {
        vote: voteStatus,
        thread: {
          connect: {
            id: threadId
          }
        },
        user: {
          connect: {
            id: user.id
          }
        }
      }
    });

    return 'Voted on thread successfully!';
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
}
