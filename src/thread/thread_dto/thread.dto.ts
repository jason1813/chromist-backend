import { Thread, User } from '@prisma/client';
import { VoteStatus } from 'src/utility/objects.utils';

interface UnformattedThreadDto extends Thread {
  _count: { comments: number };
  votes: { vote: number; userId: number }[];
  author: { id: number; username: string };
}

interface FormattedThreadDto extends Omit<Thread, 'authorId'> {
  author: Omit<User, 'password'>;
  numberOfComments: number;
  voteScore: number;
  voteStatus: VoteStatus;
}

export { FormattedThreadDto, UnformattedThreadDto };
