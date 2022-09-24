import { getVoteScore, getVoteStatus } from 'src/utility/functions.utils';
import { FormattedThreadDto, UnformattedThreadDto } from '../thread_dto';

const formatThread = (
  unformattedThread: UnformattedThreadDto,
  userId?: number
): FormattedThreadDto => {
  const { authorId, votes, _count, ...threadStripped } = unformattedThread;

  const formattedThread: FormattedThreadDto = {
    ...threadStripped,
    numberOfComments: unformattedThread._count.comments,
    voteScore: getVoteScore(unformattedThread.votes),
    voteStatus: getVoteStatus(unformattedThread.votes, userId)
  };
  return formattedThread;
};

export { formatThread };
