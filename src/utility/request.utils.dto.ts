import { Transform } from 'class-transformer';
import { IsEnum, IsNumber } from 'class-validator';
import { VoteStatus } from './objects.utils';

class PostVoteStatusDto {
  @Transform(({ value }) => parseInt(value))
  @IsEnum(VoteStatus)
  voteStatus: VoteStatus;
}

class QueryStartIndexDto {
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  startIndex: number = 0;
}

export { PostVoteStatusDto, QueryStartIndexDto };
