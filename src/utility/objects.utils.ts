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

export { commentInclude };
