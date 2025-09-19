import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TasksService {
  constructor(private repo: Repository<TaskEntity>) {}

  async create(task: Partial<TaskEntity>) {
    const id = uuidv4();
    const ent = this.repo.create({ ...task, id, status: task.status || 'TODO' });
    return this.repo.save(ent);
  }

async findVisibleTo(user: any) {
    // Simple scope: tasks where orgId === user.orgId
    return this.repo.findBy({ orgId: user.orgId });
  }

  async findById(id: string) {
    return this.repo.findOneBy({ id });
  }

  async update(id: string, patch: Partial<TaskEntity>) {
    await this.repo.update({ id }, patch);
    return this.findById(id);
  }

  async delete(id: string) {
    return this.repo.delete({ id });
  }
}
