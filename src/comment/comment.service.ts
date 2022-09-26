import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { VoteStatus } from 'src/thread/thread_dto';
import { FormattedCommentDto } from './comment_dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

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
}
