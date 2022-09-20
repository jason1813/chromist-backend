import { Thread, User, VoteStatus } from '@prisma/client';

enum VoteStatusNeutral {
  neutral = 'neutral'
}

interface ThreadReturnDto extends Thread {
  author: User;
  numberOfComments: number;
  voteScore: number;
  voteStatus: VoteStatus | VoteStatusNeutral;
}

export { ThreadReturnDto, VoteStatusNeutral };
