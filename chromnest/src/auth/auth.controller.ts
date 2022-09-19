import { Body, Controller, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthBodyDto, AuthQueryDto, SigninAction } from './auth_dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @Post('tokens')
  signin(@Query() query: AuthQueryDto, @Body() body: AuthBodyDto) {
    return query.action == SigninAction.signup ?
    this.authService.signup(body) :
    this.authService.login(body);
  }
}
