import { Injectable } from '@nestjs/common';
import { FileRepository } from './file.repository';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { UploadFileDto } from './dto';
import { FileEntity } from './file.entity';
import { EntityManager, DataSource } from 'typeorm';

@Injectable()
export class FileService {
  constructor(
    private readonly fileRepository: FileRepository,
    private readonly configService: ConfigService,
    private readonly connection: DataSource,
  ) {}

  private s3 = new S3({
    accessKeyId: this.configService.get('awsS3.accessKeyId'),
    secretAccessKey: this.configService.get('awsS3.secretAccessKey'),
  });

  private BUCKET_NAME = this.configService.get('awsS3.bucket');

  async uploadFile(file: Express.Multer.File) {
    const { originalname } = file;

    const newName = new Date().getTime() + originalname;

    const params = {
      file: file.buffer,
      bucket: this.BUCKET_NAME,
      name: newName,
      mimetype: file.mimetype,
    };

    const response = await this.upload(params);

    const { Location, Key } = response;

    const newFile = new FileEntity();
    newFile.key = Key;
    newFile.url = Location;

    await this.connection.transaction(async (manager: EntityManager) => {
      await manager.save(newFile);
    });

    return newFile;
  }

  async deleteFile(fileId: string) {
    const deletedFile = await this.fileRepository.getById(fileId);
    const { key } = deletedFile;
    await this.delete(key, this.BUCKET_NAME);
    await this.fileRepository.remove(fileId);
  }

  async updateFile(file: Express.Multer.File, fileId: string) {
    const updatedFile = await this.fileRepository.getById(fileId);

    const { key } = updatedFile;

    const params = {
      file: file.buffer,
      bucket: this.BUCKET_NAME,
      name: key,
      mimetype: file.mimetype,
    };

    const response = await this.upload(params);

    const { Key, Location } = response;

    updatedFile.key = Key;
    updatedFile.url = Location;

    await this.connection.transaction(async (manager: EntityManager) => {
      await manager.save(updatedFile);
    });

    return updatedFile;
  }

  async upload(value: UploadFileDto) {
    const params = {
      Bucket: value.bucket,
      Key: String(value.name),
      Body: value.file,
      ContentType: value.mimetype,
    };
    try {
      const s3Response = await this.s3.upload(params).promise();
      return s3Response;
    } catch (e) {
      throw new Error('Error with uploading file to AWS');
    }
  }

  async delete(Key: string, Bucket: string) {
    try {
      await this.s3.deleteObject({ Key, Bucket }).promise();
    } catch (e) {
      throw new Error('Error with deleting file from AWS');
    }
  }
}
