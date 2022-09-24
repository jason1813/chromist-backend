import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { FormattedCommentDto, UnformattedCommentDto } from 'src/comment/comment_dto/comment.dto';
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
      return this.formatComment(comment, userId);
    });

    return formattedComments;
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

  formatComment = (
    unformattedComment: UnformattedCommentDto,
    userId?: number
  ): FormattedCommentDto => {
    const { authorId, commentId, threadId, votes, _count, ...commentStripped } = unformattedComment;

    let voteStatus: VoteStatus;
    if (userId === undefined) {
      voteStatus = VoteStatus.neutral;
    } else {
      const commentVote = unformattedComment.votes.find((x) => x.userId === userId);
      voteStatus = commentVote !== undefined ? commentVote.vote : VoteStatus.neutral;
    }

    const formattedComment: FormattedCommentDto = {
      ...commentStripped,
      numberOfReplies: unformattedComment._count.replies,
      voteScore: unformattedComment.votes.reduce((sum, { vote }) => sum + vote, 0),
      voteStatus: voteStatus
    };
    return formattedComment;
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
