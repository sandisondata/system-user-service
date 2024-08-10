import { Query } from 'database';
type PrimaryKey = {
    user_uuid: string;
};
type Data = {
    is_administrator: boolean;
    is_disabled: boolean;
    is_inactive: boolean;
    api_key?: string | null;
};
export type CreateData = PrimaryKey & Data;
export type UpdateData = Partial<Data>;
declare const create: (query: Query, createData: CreateData) => Promise<object>;
declare const find: (query: Query) => Promise<object[]>;
declare const findOne: (query: Query, primaryKey: PrimaryKey) => Promise<object>;
declare const update: (query: Query, primaryKey: PrimaryKey, updateData: UpdateData) => Promise<object>;
declare const del: (query: Query, primaryKey: PrimaryKey) => Promise<void>;
export { create, find, findOne, update, del as delete };
