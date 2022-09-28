import { FormattedCommentDto, UnformattedCommentDto } from 'src/comment/comment_dto/comment.dto';
import { VoteStatus } from './objects.utils';

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

const formatComment = (
  unformattedComment: UnformattedCommentDto,
  userId?: number
): FormattedCommentDto => {
  const { authorId, commentId, threadId, votes, _count, ...commentStripped } = unformattedComment;
  const voteStatus = getVoteStatus(unformattedComment.votes, userId);

  const formattedComment: FormattedCommentDto = {
    ...commentStripped,
    numberOfReplies: unformattedComment._count.replies,
    voteScore: getVoteScore(unformattedComment.votes) - voteStatus,
    voteStatus: voteStatus
  };
  return formattedComment;
};

export { getVoteScore, getVoteStatus, formatComment };
