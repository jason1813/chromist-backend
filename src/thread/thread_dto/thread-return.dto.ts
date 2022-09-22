import { Thread, User } from '@prisma/client';

enum VoteStatus {
  up = 1,
  neutral = 0,
  down = -1
}

interface ThreadReturnDto extends Omit<Thread, 'authorId'> {
  author: Omit<User, 'password'>;
  numberOfComments: number;
  voteScore: number;
  voteStatus: VoteStatus;
}

export { ThreadReturnDto, VoteStatus };
