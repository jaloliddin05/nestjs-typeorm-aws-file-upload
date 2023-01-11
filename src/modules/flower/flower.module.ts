import { Module } from '@nestjs/common';
import { FlowerService } from './flower.service';
import { FlowerController } from './flower.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flower } from './flower.entity';
import { FlowerRepository } from './flower.repository';
import { FileModule } from '../file/file.module';

@Module({
  imports: [TypeOrmModule.forFeature([Flower]), FileModule],
  providers: [FlowerService, FlowerRepository],
  controllers: [FlowerController],
})
export class FlowerModule {}
