export interface Organization {
  id: string;
  name: string;
  parentOrgId?: string | null;
}

export type Role = 'OWNER' | 'ADMIN' | 'VIEWER';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  orgId: string;
  role: Role;
}

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface Task {
  id: string;
  title: string;
  description?: string;
  category?: string;
  ownerId: string;
  orgId: string;
  status: TaskStatus;
  order?: number;
}

export interface AuditLog {
  id: string;
  actorId: string;
  action: string;
  resource: string;
  resourceId?: string;
  timestamp: string;
}
