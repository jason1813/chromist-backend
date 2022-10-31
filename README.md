# Chromist.org Backend - Reddit-like Christian Forum

[www.chromist.org](http://www.chromist.org/) is a highly functional Christian forum website similar to reddit that allows users to upvote and downvote posts and comments.<br />

- [API documentation](https://rawcdn.githack.com/jason1813/chromist-backend/e588fb5810d31baa173dfc6a75025b500829be20/api_documentation/api_documentation.html)<br/>
- [Frontend repo](https://github.com/jason1813/chromist-frontend)

## The Stack

An API was created using the following technologies:

- [NestJS](https://nestjs.com/) - Framework used to build the API
- [Prisma](https://www.prisma.io/) - Node.js / Typescript ORM used to interact with the database
- [Postgres](https://www.postgresql.org/) - Database used
- [Passport](https://www.passportjs.org/) - Node.js library used for authenticating the JWTs

# How it's built

[Here is the guide](https://youtu.be/GHTA143_b-s) that was followed to create the API using NestJS.

## Database Tables

**User**
| Name | Type |
|----------|:-------------:|
| id | integer |
| username | text |
| password | text |

<br/>**Thread**
| Name | Type |
|----------|:-------------:|
| id | integer |
| createdAt | timestamp |
| title | text |
| description | text? |
| authorId | integer |

<br/>**Comment**
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

<br/>**ThreadVote**
| Name | Type |
|----------|:-------------:|
| id | integer |
| vote | integer (1 or -1) |
| userId | integer |
| threadId | integer |

<br/>**CommentVote**
| Name | Type |
|----------|:-------------:|
| id | integer |
| vote | integer (1 or -1) |
| userId | integer |
| commentId | integer |

## How Auth works

When a user signs up:

1. The username and raw password is received as a string
2. The password gets hashed
3. A user is created and saved to the User table with the username and hashed password
4. A JWT is generated using NestJS' JwtService
5. The JWT is returned to the client

When a user logs in:

1. The username and password is received
2. A query is done to find a user using the username
3. The sent in password gets hashed
4. The hashed password is compared to the hashed password saved on the user
5. JWT is generated and returned to the client

When a request is made that requires an auth token (like "post comment" or "post thread"):<br/>
The JWT is verified using [Passport's AuthGuard](https://docs.nestjs.com/security/authentication#login-route)

There are requests where the JWT is optional (like "get threads" or "get comments"):<br/>
That way: If the JWT is sent in, then it can return the items with the user's vote status on each thread (or comment).

## How voting works

When a vote is cast for a comment or a thread:

1. A vote status value is received (either 1, 0, -1)
2. If the vote status is 0, then delete the vote from the CommentVote / ThreadVote table (if a vote for the user exists)
3. If the vote status is 1 or -1:
   - If a vote for the user already exists: update the field for the row on the table
   - If not: Create a new row on the CommentVote/ThreadVote table with the new value

To calculate the vote scores to return on either a thread or a comment:<br/>
All the votes with the comment or thread ID are added up.<br/>
It returns the total votescore minus the user's vote status. That makes it easier on the frontend to calculate the votescore easily when the user is up and downvoting things, the frontend can just display the non-user votescore + the user's vote status.

## How it is deployed <br/>

- The Database is deployed to AWS' RDS service. [Here is a guide](https://www.tinystacks.com/blog-post/crud-api-express-with-rds-ecs-and-docker/) that shows how to do that ([video version](https://youtu.be/0sbkdX4zTWE)).
- The tables were migrated to the RDS database using `npx prisma migrate dev`
- It is recommended to test and mess around with the new RDS database once it is on the cloud.
- The NestJS application was dockerized using [this guide](https://notiz.dev/blog/dockerizing-nestjs-with-prisma-and-postgresql).
- The Docker container was deployed to AWS Fargate also using [this guide](https://www.tinystacks.com/blog-post/crud-api-express-with-rds-ecs-and-docker/).
