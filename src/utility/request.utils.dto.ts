import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { VoteStatus } from 'src/thread/thread_dto';

class PostVoteStatusDto {
  @Transform(({ value }) => parseInt(value))
  @IsEnum(VoteStatus)
  voteStatus: VoteStatus;
}

export { PostVoteStatusDto };
