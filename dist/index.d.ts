import { Query } from 'database';
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
export type CreatedRow = Required<PrimaryKey> & Required<Data>;
export type Row = Required<PrimaryKey> & Required<Data>;
export type UpdateData = Partial<Data>;
export type UpdatedRow = Required<PrimaryKey> & Required<Data>;
export declare const create: (query: Query, createData: CreateData) => Promise<CreatedRow>;
export declare const find: (query: Query) => Promise<Row[]>;
export declare const findOne: (query: Query, primaryKey: PrimaryKey) => Promise<Row>;
export declare const update: (query: Query, primaryKey: PrimaryKey, updateData: UpdateData) => Promise<Row>;
export declare const delete_: (query: Query, primaryKey: PrimaryKey) => Promise<void>;
