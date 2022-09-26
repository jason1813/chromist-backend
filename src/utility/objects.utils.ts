const commentInclude = {
  _count: {
    select: {
      replies: true
    }
  },
  votes: {
    select: { vote: true, userId: true }
  },
  author: {
    select: {
      id: true,
      username: true
    }
  }
};

enum VoteStatus {
  up = 1,
  neutral = 0,
  down = -1
}

export { commentInclude, VoteStatus };
