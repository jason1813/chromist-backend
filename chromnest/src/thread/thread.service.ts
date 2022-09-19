import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ThreadBodyDto } from './thread_dto';

@Injectable()
export class ThreadService {
    constructor(
        private prisma: PrismaService
    ) { }

    async createThread(threadBodyDto: ThreadBodyDto, author: User) {
        const thread = await this.prisma.thread.create({
            data: {
                title: threadBodyDto.title,
                description: threadBodyDto.description,
                author: {
                    connect: {
                        id: author.id
                    }
                }
            }
        })

        delete thread.authorId;
        return {
            ...thread,
            author,
            numberOfComments: 0,
            voteScore: 0,
            voteStatus: "neutral"
        }
    }
}
