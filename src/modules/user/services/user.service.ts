import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IUser } from 'src/entities/user.entity';
import { User } from 'src/models/user.model';
import { RegisterRequest } from 'src/modules/auth/request/register.request';
import { UpdateRequest } from '../request/update.request';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async findAll(): Promise<IUser[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<IUser> {
    return await this.repository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<IUser> {
    return await this.repository.findOne({ where: { email } });
  }

  async findByToken(refreshToken: string): Promise<User> {
    return await this.repository.findOne({ where: { refreshToken } });
  }

  async create(body: RegisterRequest): Promise<IUser> {
    return await this.repository.save(body);
  }

  async update(id: string, body: Partial<UpdateRequest>): Promise<IUser> {
    return await this.repository.save({ id, ...body, updatedAt: new Date() });
  }

  async delete(id: string): Promise<IUser> {
    return await this.delete(id);
  }

  async getHash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
