import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { SignUpDto } from './auth/dto/auth-dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  async create(createUserDto: SignUpDto): Promise<User> {
    const {
      email,
      username,
      password,
      phone_number,
      birthday,
      profile_picture,
    } = createUserDto;

    const newUser = new User();
    newUser.email = email;
    newUser.username = username;
    newUser.password = password;
    newUser.birthday = new Date(birthday).toISOString(); // convert Date to string
    newUser.phone_number = phone_number;
    newUser.profile_picture = profile_picture;

    const user = await this.repo.create(newUser);
    return this.repo.save(user);
  }

  findEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  findUsername(username: string) {
    return this.repo.findOne({ where: { username } });
  }

  findAll() {
    return `This action returns all user`;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
