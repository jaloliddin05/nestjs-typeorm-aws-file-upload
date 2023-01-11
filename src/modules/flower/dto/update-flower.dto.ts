import { IsString, IsOptional } from 'class-validator';

class UpdateFlowerDto {
  @IsOptional()
  @IsString()
  readonly title: string;
}

export default UpdateFlowerDto;
