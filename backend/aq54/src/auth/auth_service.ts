import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FirebaseAdminService } from './firebase-admin_service'; 
import { AuthCredentialsDto } from './dto/auth_credentials_dto';
import * as bcrypt from 'bcrypt';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  constructor(private readonly firebaseAdminService: FirebaseAdminService) {}

  // Sign up a new user
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { email, password } = authCredentialsDto;

    // Create user with Firebase Admin
    try {
      const userRecord = await this.firebaseAdminService.createUser(email, password);
      return `User created with UID: ${userRecord.uid}`;
    } catch (error) {
      throw new UnauthorizedException('Error signing up user');
    }
  }

  // Login a user
  async login(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { email, password } = authCredentialsDto;

    // Validate user credentials
    const user = await this.firebaseAdminService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    

    // Generate a custom token using Firebase Admin SDK
    try {
      const customToken = await admin.auth().createCustomToken(user.uid);
      return customToken;
    } catch (error) {
      throw new UnauthorizedException('Error creating custom token');
    }
  }

  // Logout
  async logout(idToken: string): Promise<void> {
    try {
     
      await this.firebaseAdminService.verifyIdToken(idToken);
     
    } catch (error) {
      throw new UnauthorizedException('Invalid token or error logging out');
    }
  }
}
