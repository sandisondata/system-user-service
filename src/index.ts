import {
  CreateData,
  PrimaryKey,
  Query,
  Row,
  Service,
  UpdateData,
} from './class';

export { CreateData, PrimaryKey, Query, Row, UpdateData };

const service = new Service(
  'system-user-service',
  '_users',
  ['uuid'],
  ['is_administrator', 'is_enabled', 'is_active', 'api_key'],
  false,
);

export { service };
