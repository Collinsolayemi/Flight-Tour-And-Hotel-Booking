import { Exclude, Expose } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Expose()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  @Expose()
  email: string;

  @Column()
  @Expose()
  phone_number: string;

  @Expose()
  @Column()
  profile_picture: string;

  @Expose()
  @Column()
  birthday: string;

  
}
