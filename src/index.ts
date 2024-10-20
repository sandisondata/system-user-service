import { Service } from './class';

export const service = new Service(
  'system-user-service',
  '_users',
  ['uuid'],
  ['is_administrator', 'is_enabled', 'is_active', 'api_key'],
  false,
);

export { CreateData, PrimaryKey, Row, UpdateData } from './class';
