import { VoteStatus } from 'src/thread/thread_dto';

const getVoteStatus = (votes: { vote: number; userId: number }[], userId?: number) => {
  if (userId === undefined) {
    return VoteStatus.neutral;
  }
  const vote = votes.find((x) => x.userId === userId);
  return vote !== undefined ? vote.vote : VoteStatus.neutral;
};

const getVoteScore = (votes: { vote: number; userId: number }[]): number => {
  return votes.reduce((sum, { vote }) => sum + vote, 0);
};

export { getVoteScore, getVoteStatus };
