import { Comment, User } from '@prisma/client';
import { VoteStatus } from 'src/thread/thread_dto';

interface UnformattedCommentDto extends Comment {
  author: Omit<User, 'password'>;
  votes: { vote: number; userId: number }[];
  _count: { replies: number };
}

interface FormattedCommentDto extends Omit<Comment, 'authorId' | 'commentId' | 'threadId'> {
  author: Omit<User, 'password'>;
  numberOfReplies: number;
  voteScore: number;
  voteStatus: VoteStatus;
}

export { UnformattedCommentDto, FormattedCommentDto };
