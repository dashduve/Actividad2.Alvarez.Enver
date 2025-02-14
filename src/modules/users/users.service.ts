import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { UpdateUserDto } from '../../dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findAll() {
    return this.userRepository.find({
      select: ['id', 'email', 'fullName', 'isActive', 'createdAt'],
      relations: ['roles'],
    });
  }

  async findById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findById(id);
    await this.userRepository.update(id, updateUserDto);
    return this.findById(id);
  }

  async delete(id: number) {
    const user = await this.findById(id);
    await this.userRepository.remove(user);
  }
}
