import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { VoteStatus } from 'src/utility/objects.utils';
import { formatComment } from 'src/utility/functions.utils';
import { commentInclude } from 'src/utility/objects.utils';
import { FormattedCommentDto } from './comment_dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async getReplies(
    commentId: number,
    startIndex: number,
    userId?: number
  ): Promise<FormattedCommentDto[]> {
    const replies = await this.prisma.comment.findMany({
      where: {
        commentId: commentId
      },
      orderBy: {
        id: 'desc'
      },
      include: commentInclude,
      skip: startIndex,
      take: 20
    });

    const formattedReplies: FormattedCommentDto[] = replies.map((comment) => {
      return formatComment(comment, userId);
    });

    return formattedReplies;
  }

  async createReply(commentId: number, text: string, author: User): Promise<FormattedCommentDto> {
    const comment = await this.prisma.comment.create({
      data: {
        text: text,
        comment: {
          connect: {
            id: commentId
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

  async voteOnComment(commentId: number, voteStatus: VoteStatus, user: User): Promise<string> {
    await this.prisma.commentVote.create({
      data: {
        vote: voteStatus,
        comment: {
          connect: {
            id: commentId
          }
        },
        user: {
          connect: {
            id: user.id
          }
        }
      }
    });

    return 'Voted on comment successfully!';
  }
}
