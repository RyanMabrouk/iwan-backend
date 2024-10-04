import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SupabaseStrategy } from './supabase.strategy';
import { SupabaseGuard } from './supabase.guard';

@Module({
  imports: [PassportModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: SupabaseGuard,
    },
    SupabaseStrategy,
  ],
})
export class AuthModule {}
