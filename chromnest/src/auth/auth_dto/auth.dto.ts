import { IsEnum, IsNotEmpty, IsString } from "class-validator";

class AuthBodyDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

enum SigninAction {
    signup = 'signup',
    login = 'login'
}

class AuthQueryDto {
    @IsString()
    @IsNotEmpty()
    @IsEnum(SigninAction)
    action: SigninAction;
}

export { AuthBodyDto, AuthQueryDto, SigninAction }
