import { Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

@Injectable()
export class FirebaseAdminService {
  private logger: Logger = new Logger('FirebaseAdminService');

  constructor() {
    this.initializeFirebase();
  }

  private initializeFirebase() {
    const serviceAccount: ServiceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    };

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    this.logger.log('Firebase Admin initialized');
  }

  async verifyIdToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
    try {
      return await admin.auth().verifyIdToken(idToken);
    } catch (error) {
      this.logger.error('Error verifying ID token', error);
      throw error;
    }
  }

  async createUser(email: string, password: string): Promise<admin.auth.UserRecord> {
    try {
      return await admin.auth().createUser({ email, password });
    } catch (error) {
      this.logger.error('Error creating user', error);
      throw error;
    }
  }

  async getUserByEmail(email: string): Promise<admin.auth.UserRecord> {
    try {
      return await admin.auth().getUserByEmail(email);
    } catch (error) {
      this.logger.error('Error fetching user by email', error);
      throw error;
    }
  }

  async deleteUser(uid: string): Promise<void> {
    try {
      await admin.auth().deleteUser(uid);
    } catch (error) {
      this.logger.error('Error deleting user', error);
      throw error;
    }
  }
}