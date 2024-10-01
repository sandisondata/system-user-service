import { RepositoryUserService } from './class';

const repositoryUserService = new RepositoryUserService(
  'repository-user-service',
  '_users',
  ['uuid'],
  ['is_administrator', 'is_enabled', 'is_active', 'api_key'],
);

export { repositoryUserService };
export { CreateData, Data, PrimaryKey, Query, Row, UpdateData } from './class';
