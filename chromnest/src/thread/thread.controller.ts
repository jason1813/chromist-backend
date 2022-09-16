import { Controller, Req, Post, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';

@Controller('threads')
export class ThreadController {

    @UseGuards(JwtGuard)
    @Post()
    postThread(@Req() req: Request) {
        console.log({ user: req.user })
        return req.user
    }
}
