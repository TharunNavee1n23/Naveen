import { Role } from '../../libs/data/src/index';

export const ROLE_HIERARCHY: Record<Role, number> = {
  OWNER: 3,
  ADMIN: 2,
  VIEWER: 1,
};

export function roleAtLeast(userRole: Role, required: Role) {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[required];
}
