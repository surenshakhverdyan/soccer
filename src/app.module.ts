import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { TokenModule } from './token/token.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { TeamsModule } from './teams/teams.module';
import { PlayersModule } from './players/players.module';
import { ImagesModule } from './images/images.module';
import { CronsModule } from './crons/crons.module';
import { TransfersModule } from './transfers/transfers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        dbName: configService.get<string>('DB_NAME'),
      }),
    }),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('EMAIL_HOST'),
          secure: true,
          auth: {
            user: configService.get<string>('EMAIL_ADDRESS'),
            pass: configService.get<string>('EMAIL_PASSWORD'),
          },
        },
      }),
    }),
    TokenModule,
    UsersModule,
    AuthModule,
    AdminModule,
    DashboardModule,
    TeamsModule,
    PlayersModule,
    ImagesModule,
    CronsModule,
    TransfersModule,
  ],
})
export class AppModule {}
