import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthBodyDto } from './auth_dto';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}
  
  async signup(body: AuthBodyDto) {
    const hashedPassword = await bcrypt.hash(body.password, 10);

    try {
      const user = await this.prisma.user.create({
        data: {
          username: body.username,
          password: hashedPassword
        }
      });

      return this.signToken(user.id, user.username);

    } catch(error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken')
        }
      }
      throw error;
    }
  }

  async login(body: AuthBodyDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: body.username
      }
    })

    if (!user) {
      throw new ForbiddenException('Credentials incorrect')
    }

    const pwMatches = await bcrypt.compare (
      body.password, user.password
    )

    if (!pwMatches) {
      throw new ForbiddenException('Credentials incorrect')
    }

    return this.signToken(user.id, user.username);
  }

  async signToken(userId: number, username: string): Promise<{access_token: string}> {
    const payload = { 
      sub: userId,
      username
    }

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '60m',
      secret: secret
    })

    return {
      access_token: token
    }
  }
}
