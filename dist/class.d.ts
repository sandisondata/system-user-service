import { RepositoryService } from 'repository-service-class';
export { CreateData, Query, Row, UpdateData } from 'repository-service-class';
export type PrimaryKey = {
    uuid?: string;
};
export type Data = {
    is_administrator?: boolean;
    is_enabled?: boolean;
    is_active?: boolean;
    api_key?: string | null;
};
export declare class RepositoryUserService extends RepositoryService<PrimaryKey, Data> {
    preCreate(): Promise<void>;
    preUpdate(): Promise<void>;
}
