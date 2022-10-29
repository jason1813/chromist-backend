# Chromist.org - Reddit-like Christian Forum

[www.chromist.org](http://www.chromist.org/) is a highly functional forum-based Christian website similar to reddit that allows users to upvote and downvote posts and comments.<br />

## The Stack

Here is the tech stack that was used to build Chromist:

### Backend

An API was created for the backend using the following technologies:

- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [Postgres](https://www.postgresql.org/)
- [Passport](https://www.passportjs.org/)

### Frontend

The frontend was created using the following technologies:

- [ReactJS](https://reactjs.org/)
- [React Redux](https://react-redux.js.org/)

## How it was created

### Backend

Here are the tables that were used for the Postgres Database

**User**
| Name | Type |
|----------|:-------------:|
| id | integer |
| username | text |
| password | text |

**Thread**
| Name | Type |
|----------|:-------------:|
| id | integer |
| createdAt | timestamp |
| title | text |
| description | text? |
| authorId | integer |

**Comment**
| Name | Type |
|----------|:-------------:|
| id | integer |
| createdAt | timestamp |
| text | text |
| authorId | integer |
| threadId | integer? |
| commentId | integer? |

Note that a comment will have a threadId if the comment is not a reply to any comments on the thread.\
If the comment is a reply to a comment, then it will have a commentId and no threadId.

**ThreadVote**
| Name | Type |
|----------|:-------------:|
| id | integer |
| vote | integer (1 or -1) |
| userId | integer |
| threadId | integer |

**CommentVote**
| Name | Type |
|----------|:-------------:|
| id | integer |
| vote | integer (1 or -1) |
| userId | integer |
| commentId | integer |
