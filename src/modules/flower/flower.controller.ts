import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
  Delete,
  Patch,
  Param,
  Get,
} from '@nestjs/common';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

import { CreateFlowerDto, UpdateFlowerDto } from './dto';
import { Flower } from './flower.entity';
import { FlowerService } from './flower.service';

@Controller('flowers')
export class FlowerController {
  constructor(private readonly flowerService: FlowerService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getData(): Promise<{ items: Flower[]; totalItemsCount: number }> {
    try {
      return await this.flowerService.getAll();
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getMe(@Param('id') id: string): Promise<Flower> {
    return this.flowerService.getOne(id);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async saveData(@Body() data: CreateFlowerDto): Promise<InsertResult> {
    try {
      return await this.flowerService.create(data);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  async changeData(
    @Body() data: UpdateFlowerDto,
    @Param('id') id: string,
  ): Promise<UpdateResult> {
    try {
      return await this.flowerService.change(data, id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string): Promise<DeleteResult> {
    try {
      return await this.flowerService.deleteOne(id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
