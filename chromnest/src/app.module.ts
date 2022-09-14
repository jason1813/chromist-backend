import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ThreadModule } from './thread/thread.module';
import { CommentModule } from './comment/comment.module';
import { ThreadvoteModule } from './threadvote/threadvote.module';
import { CommentvoteModule } from './commentvote/commentvote.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, UserModule, ThreadModule, CommentModule, ThreadvoteModule, CommentvoteModule, PrismaModule],
})
export class AppModule {}
