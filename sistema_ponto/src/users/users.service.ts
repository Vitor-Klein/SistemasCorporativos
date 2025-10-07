import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

  async create(dto: CreateUserDto): Promise<User> {
    const exists = await this.repo.findOne({ where: { email: dto.email } });
    if (exists) {
      throw new ConflictException('Email already registered');
    }
    const user = this.repo.create({
      name: dto.name,
      email: dto.email,
      passwordHash: bcrypt.hashSync(dto.password, 10),
    });
    return this.repo.save(user);
  }

  findAll(): Promise<User[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (dto.email && dto.email !== user.email) {
      const exists = await this.repo.findOne({ where: { email: dto.email } });
      if (exists) throw new ConflictException('Email already registered');
    }
    if (dto.password) {
      user.passwordHash = bcrypt.hashSync(dto.password, 10);
    }
    if (dto.name !== undefined) user.name = dto.name;
    if (dto.email !== undefined) user.email = dto.email;
    return this.repo.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.repo.remove(user);
  }
}
