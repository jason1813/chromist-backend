import { getVoteScore, getVoteStatus } from 'src/utility/functions.utils';
import { ThreadReturnDto, UnformattedThreadDto } from '../thread_dto';

const formatThread = (
  unformattedThread: UnformattedThreadDto,
  userId?: number
): ThreadReturnDto => {
  const { authorId, votes, _count, ...threadStripped } = unformattedThread;

  const formattedThread: ThreadReturnDto = {
    ...threadStripped,
    numberOfComments: unformattedThread._count.comments,
    voteScore: getVoteScore(unformattedThread.votes),
    voteStatus: getVoteStatus(unformattedThread.votes, userId)
  };
  return formattedThread;
};

export { formatThread };
