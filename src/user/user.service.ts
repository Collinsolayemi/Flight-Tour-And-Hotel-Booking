import { BadRequestException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { SignUpDto } from './auth/dto/auth-dto';


@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  async create(signUpDto: SignUpDto): Promise<User> {
    const {
      email,
      username,
      password,
      phone_number,
      birthday,
      profile_picture,
    } = signUpDto;

    const newUser = new User();
    newUser.email = email;
    newUser.username = username;
    newUser.password = password;
    newUser.birthday = new Date(birthday);
    newUser.phone_number = phone_number;
    newUser.profile_picture = profile_picture;

    const user = await this.repo.create(newUser);
    return this.repo.save(user);
  }

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  findByUsername(username: string) {
    return this.repo.findOne({ where: { username } });
  }

  findByPhoneNumber(phone_number: string) {
    return this.repo.findOne({ where: { phone_number } });
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

  async update(user: User): Promise<User> {
    try {
      return await this.repo.save(user);
    } catch (error) {
      throw new BadRequestException('Failed to update user');
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findByResetPasswordToken(token: string) {
    return this.repo.findOne({
      where: {
        resetPasswordToken: token,
      },
    });
  }
}
