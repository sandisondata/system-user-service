import { BaseService, Query } from 'base-service-class';
export { Query };
export type PrimaryKey = {
    uuid?: string;
};
export type Data = {
    is_administrator?: boolean;
    is_enabled?: boolean;
    is_active?: boolean;
    api_key?: string | null;
};
export type CreateData = PrimaryKey & Data;
export type UpdateData = Partial<Data>;
export type Row = Required<PrimaryKey> & Required<Data>;
export declare class Service extends BaseService<PrimaryKey, CreateData, UpdateData, Row> {
    preCreate(): Promise<void>;
    preUpdate(): Promise<void>;
}
