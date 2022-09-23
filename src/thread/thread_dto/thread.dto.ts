import { Thread, User } from '@prisma/client';

enum VoteStatus {
  up = 1,
  neutral = 0,
  down = -1
}

interface UnformattedThreadDto extends Thread {
  _count: { comments: number };
  votes: { vote: number; userId: number }[];
  author: { id: number; username: string };
}

interface ThreadReturnDto extends Omit<Thread, 'authorId'> {
  author: Omit<User, 'password'>;
  numberOfComments: number;
  voteScore: number;
  voteStatus: VoteStatus;
}

export { ThreadReturnDto, VoteStatus, UnformattedThreadDto };
