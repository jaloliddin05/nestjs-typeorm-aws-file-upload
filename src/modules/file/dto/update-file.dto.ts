import { IsNotEmpty, IsString } from 'class-validator';

class UpdateFileDto {
  @IsNotEmpty()
  @IsString()
  readonly url: string;

  @IsNotEmpty()
  @IsString()
  readonly key: string;
}

export default UpdateFileDto;
