import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { FileEntity } from '../file/file.entity';

@Entity({ name: 'flower' })
export class Flower extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToOne(() => FileEntity, (file) => file.flower)
  @JoinColumn()
  avatar: FileEntity;
}
