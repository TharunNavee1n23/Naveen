import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private repo: Repository<UserEntity>) {}

  async create(email: string, password: string, orgId: string, role = 'VIEWER') {
    const id = uuidv4();
    const hash = await bcrypt.hash(password, 10);
    const u = this.repo.create({ id, email, passwordHash: hash, orgId, role });
    return this.repo.save(u);
  }

  async findByEmail(email: string) {
    return this.repo.findOneBy({ email });
  }

  async findById(id: string) {
    return this.repo.findOneBy({ id });
  }
}
