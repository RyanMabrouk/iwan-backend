import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SupabaseStrategy } from './supabase.strategy';
import { DatabaseModule } from '../database/database.module';
import { SupabaseGuard } from './guards/supabase.guard';
import { UsersModule } from '../modules/users/user.module';

@Module({
  imports: [PassportModule, DatabaseModule, UsersModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: SupabaseGuard,
    },
    SupabaseStrategy,
  ],
})
export class AuthModule {}
