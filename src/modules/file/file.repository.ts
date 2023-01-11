import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { FileEntity } from './file.entity';
import { CreateFileDto, UpdateFileDto } from './dto';

@Injectable()
export class FileRepository {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

  async getById(id: string): Promise<FileEntity> {
    return this.fileRepository
      .createQueryBuilder()
      .where('id = :id', { id })
      .getOne();
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.fileRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }

  async create(values: CreateFileDto): Promise<InsertResult> {
    return this.fileRepository
      .createQueryBuilder()
      .insert()
      .into(FileEntity)
      .values(values as unknown as FileEntity)
      .execute();
  }

  async update(values: UpdateFileDto, id: string): Promise<UpdateResult> {
    return this.fileRepository
      .createQueryBuilder()
      .update(FileEntity)
      .set(values as unknown as FileEntity)
      .where('id = :id', { id })
      .execute();
  }
}
