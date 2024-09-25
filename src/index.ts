import {
  CreateData,
  Data,
  PrimaryKey,
  Query,
  Row,
  UpdateData,
  RepositoryUserService, // Class
} from './class';

export { CreateData, Data, PrimaryKey, Query, Row, UpdateData };

const repositoryUserService = new RepositoryUserService(
  'repository-user-service',
  '_users',
  ['uuid'],
  ['is_administrator', 'is_enabled', 'is_active', 'api_key'],
);

export { repositoryUserService };
