import { IsNotEmpty, IsString } from 'class-validator';

class UploadFileDto {
  @IsNotEmpty()
  @IsString()
  readonly file: Buffer;

  @IsNotEmpty()
  @IsString()
  readonly bucket: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly mimetype: string;
}

export default UploadFileDto;
