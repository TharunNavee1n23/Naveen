import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()

export class AuditService {
  private logs: any[] = [];

  log(actorId: string, action: string, resource: string, resourceId?: string) {
    const entry = {
      id: uuidv4(),
      actorId,
      action,
      resource,
      resourceId,
      timestamp: new Date().toISOString(),
    };
    this.logs.push(entry);
    console.log('AUDIT:', entry);
  }

  list() {
    return this.logs.slice().reverse();
  }
}
