import { Thread, User, VoteStatus } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

class ThreadBodyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

enum VoteStatusNeutral {
  neutral = 'neutral'
}

interface ThreadReturnDto extends Thread {
  author: User;
  numberOfComments: number;
  voteScore: number;
  voteStatus: VoteStatus | VoteStatusNeutral;
}

export { ThreadBodyDto, ThreadReturnDto, VoteStatusNeutral };
