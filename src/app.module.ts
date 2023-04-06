import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import * as ConfigEnv from '@nestjs/config';


@Module({
  imports: [
    ConfigEnv.ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
