import { Module } from '@nestjs/common';
import { EpisodesController } from './episodes.controller';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [ConfigModule],
  controllers: [EpisodesController]
})
export class EpisodesModule {}
