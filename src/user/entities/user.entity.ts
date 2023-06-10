import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
//import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  phone_number: string;

  @Column()
  profile_picture: string;

  @Column()
  birthday: string;
}
