import { Module } from '@nestjs/common';
import { AuthController } from "./auth_controller";
import { AuthService } from "./auth_service";
import { FirebaseAdminService } from "./firebase-admin_service";


@Module({
    providers: [AuthService, FirebaseAdminService],
    controllers: [AuthController],
    exports: [AuthService], 
  })
  export class AuthModule {}