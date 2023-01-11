import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UpdateFlowerDto, CreateFlowerDto } from './dto';
import { FlowerRepository } from './flower.repository';

@Injectable()
export class FlowerService {
  constructor(private readonly flowerRepository: FlowerRepository) {}

  async getAll() {
    const [data, count] = await this.flowerRepository.getAll();
    return { items: data, totalItemsCount: count };
  }

  async getOne(id: string) {
    const flower = await this.flowerRepository.getById(id);
    if (!flower) {
      throw new HttpException('flower not found', HttpStatus.NOT_FOUND);
    }
    return flower;
  }

  async deleteOne(id: string) {
    const response = await this.flowerRepository.remove(id);
    return response;
  }

  async change(value: UpdateFlowerDto, id: string) {
    const response = await this.flowerRepository.update(value, id);
    return response;
  }

  async create(value: CreateFlowerDto) {
    const response = await this.flowerRepository.create(value);
    return response;
  }
}
