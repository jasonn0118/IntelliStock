import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() body: CreateUserDto) {
    const user = await this.authService.signUp(body.email, body.password);
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signIn(@Request() req, @Body() body: CreateUserDto) {
    return this.authService.loginWithJwt(req.user);
  }

  @Get('/google')
  async googleAuth() {
    // Initiates Google OAuth flow
  }

  @UseGuards(AuthGuard('google'))
  @Get('/google/callback')
  async googleAuthRedirect(@Request() req) {
    // Handles Google OAuth callback

    if (!req.user) {
      throw new UnauthorizedException();
    }

    // Ensure loginWithJwt is called only once
    if (req.user.access_token) {
      return req.user;
    }

    return this.authService.loginWithJwt(req.user);
  }

  @Get('/github')
  async githubAuth() {
    // Initiates GitHub OAuth flow
  }

  @UseGuards(AuthGuard('github'))
  @Get('/github/callback')
  async githubAuthRedirect(@Request() req) {
    // Handles GitHub OAuth callback

    if (!req.user) {
      throw new UnauthorizedException();
    }

    // Ensure loginWithJwt is called only once
    if (req.user.access_token) {
      return req.user;
    }

    return this.authService.loginWithJwt(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@CurrentUser() user) {
    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }
    return user;
  }
}
