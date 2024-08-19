import { Query } from 'database';
export type PrimaryKey = {
    user_uuid: string;
};
export type Data = {
    is_administrator: boolean;
    is_enabled: boolean;
    is_active: boolean;
    api_key?: string | null;
};
export declare const dataColumnNames: string[];
export type CreateData = PrimaryKey & Data;
export type Row = PrimaryKey & Required<Data>;
export type UpdateData = Partial<Data>;
export declare const create: (query: Query, createData: CreateData) => Promise<Row>;
export declare const find: (query: Query) => Promise<Row[]>;
export declare const findOne: (query: Query, primaryKey: PrimaryKey) => Promise<Row>;
export declare const update: (query: Query, primaryKey: PrimaryKey, updateData: UpdateData) => Promise<Row>;
export declare const delete_: (query: Query, primaryKey: PrimaryKey) => Promise<void>;
