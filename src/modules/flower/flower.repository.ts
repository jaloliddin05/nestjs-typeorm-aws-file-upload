import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, InsertResult, UpdateResult } from 'typeorm';

import { CreateFlowerDto, UpdateFlowerDto } from './dto';
import { Flower } from './flower.entity';

@Injectable()
export class FlowerRepository {
  constructor(
    @InjectRepository(Flower)
    private readonly flowerRepository: Repository<Flower>,
  ) {}

  async getAll() {
    return this.flowerRepository.createQueryBuilder().getManyAndCount();
  }

  async getById(id: string): Promise<Flower> {
    return this.flowerRepository
      .createQueryBuilder()
      .where('id = :id', { id })
      .getOne();
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.flowerRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }

  async create(values: CreateFlowerDto): Promise<InsertResult> {
    return this.flowerRepository
      .createQueryBuilder()
      .insert()
      .into(Flower)
      .values(values as unknown as Flower)
      .returning('id')
      .execute();
  }

  async update(values: UpdateFlowerDto, id: string): Promise<UpdateResult> {
    return this.flowerRepository
      .createQueryBuilder()
      .update(Flower)
      .set(values as unknown as Flower)
      .where('id = :id', { id })
      .execute();
  }
}
