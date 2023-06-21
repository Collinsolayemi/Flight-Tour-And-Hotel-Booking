
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';



@Entity()
export class Otp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  expiredAt: Date;

  @Column()
  signUpOtp: string;

  @Column()
  userId: string;

  @Column()
  forgetPasswordOtp: string
}
