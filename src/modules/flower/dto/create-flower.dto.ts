import { IsNotEmpty, IsString } from 'class-validator';

class CreateFlowerDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;
}

export default CreateFlowerDto;
