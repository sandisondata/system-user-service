import { Service } from 'service-class';
export type PrimaryKey = {
    uuid?: string;
};
export type Data = {
    is_administrator?: boolean;
    is_enabled?: boolean;
    is_active?: boolean;
    api_key?: string | null;
};
export declare class SystemUserService extends Service<PrimaryKey, Data, false> {
    preCreate(): Promise<void>;
    preUpdate(): Promise<void>;
}
export { CreateData, Query, Row, UpdateData } from 'service-class';
