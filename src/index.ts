import { Data, PrimaryKey, Query, Service } from './class';

export { Data, PrimaryKey, Query };

const service = new Service(
  'system-user-service',
  '_users',
  ['uuid'],
  ['is_administrator', 'is_enabled', 'is_active', 'api_key'],
  false,
);

export { service };
