import { SystemUserService } from './class';

export const systemUserService = new SystemUserService(
  'system-user-service',
  '_users',
  ['uuid'],
  ['is_administrator', 'is_enabled', 'is_active', 'api_key'],
  false,
);

export { CreateData, Data, PrimaryKey, Query, Row, UpdateData } from './class';
