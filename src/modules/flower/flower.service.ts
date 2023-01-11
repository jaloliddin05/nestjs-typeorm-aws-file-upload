import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { FileService } from '../file/file.service';
import { UpdateFlowerDto, CreateFlowerDto } from './dto';
import { FlowerRepository } from './flower.repository';

@Injectable()
export class FlowerService {
  constructor(
    private readonly flowerRepository: FlowerRepository,
    private readonly fileService: FileService,
    private readonly connection: DataSource,
  ) {}

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
    await this.deleteFlowerImage(id);
    const response = await this.flowerRepository.remove(id);
    return response;
  }

  async change(value: UpdateFlowerDto, id: string, file: Express.Multer.File) {
    const response = await this.flowerRepository.update(value, id);
    if (file) {
      return await this.updateFlowerImage(file, id);
    } else {
      return response;
    }
  }

  async create(value: CreateFlowerDto, file: Express.Multer.File) {
    const response = await this.flowerRepository.create(value);
    const id = response.raw[0].id;
    return await this.uploadFlowerImage(file, id);
  }

  async uploadFlowerImage(file: Express.Multer.File, flowerId: string) {
    const avatar = await this.fileService.uploadFile(file);
    const flower = await this.getOne(flowerId);
    flower.avatar = avatar;

    await this.connection.transaction(async (manager: EntityManager) => {
      await manager.save(flower);
    });

    return flower;
  }

  async updateFlowerImage(file: Express.Multer.File, flowerId: string) {
    const flower = await this.getOne(flowerId);
    const avatar = await this.fileService.updateFile(file, flower.avatar.id);
    flower.avatar = avatar;

    await this.connection.transaction(async (manager: EntityManager) => {
      await manager.save(flower);
    });

    return flower;
  }

  async deleteFlowerImage(flowerId: string) {
    const flower = await this.getOne(flowerId);
    const deletedAvatar = await this.fileService.deleteFile(flower.avatar.id);
  }
}
