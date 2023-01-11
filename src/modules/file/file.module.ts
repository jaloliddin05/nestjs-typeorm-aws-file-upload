import { Module } from '@nestjs/common';
import { FileRepository } from './file.repository';
import { FileService } from './file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  providers: [FileService, FileRepository],
  exports: [FileService],
})
export class FileModule {}
