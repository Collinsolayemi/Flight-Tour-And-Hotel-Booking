import { Exclude, Expose } from 'class-transformer';
import { IsDate } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeInsert,
} from 'typeorm';

import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { v4 as importedUuidv4 } from 'uuid';

export function IsFuture(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isFuture',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const currentDate = new Date();
          return (
            value instanceof Date && value.getTime() > currentDate.getTime()
          );
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a date in the future`;
        },
      },
    });
  };
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Column({ type: 'date' })
  birthday: Date;

  @Column({ nullable: true })
  resetPasswordToken: string;

  // @Column({ nullable: true })
  // resetPasswordOtp: string;

  // @Column({ nullable: true })
  // isEmailVerified: boolean;

  // @Column({ nullable: true })
  // signUpPasswordOtp: string;

  @Column({ nullable: false })
  @CreateDateColumn()
  createdAt: Date;
}

function uuidv4(): string {
  throw new Error('Function not implemented.');
}
