import { Body, Controller, Post, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth_credentials_dto';
import { AuthService } from './auth_service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Sign up endpoint
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ message: string }> {
    try {
      const message = await this.authService.signUp(authCredentialsDto);
      return { message };
    } catch (error) {
      throw new UnauthorizedException('Error signing up');
    }
  }

  // Login endpoint
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    try {
      const accessToken = await this.authService.login(authCredentialsDto);
      return { accessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  // Logout endpoint
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Body('idToken') idToken: string): Promise<void> {
    try {
      await this.authService.logout(idToken);
    } catch (error) {
      throw new UnauthorizedException('Error logging out');
    }
  }
}