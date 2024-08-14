import { Query } from 'database';
import {
  checkPrimaryKey,
  checkUniqueKey,
  createRow,
  deleteRow,
  findByPrimaryKey,
  updateRow,
} from 'database-helpers';
import { Debug, MessageType } from 'node-debug';
import { objectsEqual, pick } from 'node-utilities';

let debug: Debug;
const debugSource = 'user.service';
const tableName = '_users';
const instanceName = 'user';
const debugRows = 3;

export type PrimaryKey = {
  user_uuid: string;
};

export type Data = {
  is_administrator: boolean;
  is_disabled: boolean;
  is_inactive: boolean;
  api_key?: string | null;
};

export const dataColumnNames = [
  'is_administrator',
  'is_disabled',
  'is_inactive',
  'api_key',
];

export type CreateData = PrimaryKey & Data;
export type Row = PrimaryKey & Required<Data>;
export type UpdateData = Partial<Data>;

export const create = async (query: Query, createData: CreateData) => {
  debug = new Debug(`${debugSource}.create`);
  debug.write(MessageType.Entry, `createData=${JSON.stringify(createData)}`);
  const primaryKey: PrimaryKey = { user_uuid: createData.user_uuid };
  debug.write(MessageType.Value, `primaryKey=${JSON.stringify(primaryKey)}`);
  debug.write(MessageType.Step, 'Checking primary key...');
  await checkPrimaryKey(query, tableName, instanceName, primaryKey);
  debug.write(MessageType.Step, 'Validating data...');
  if (
    typeof createData.api_key !== 'undefined' &&
    createData.api_key !== null
  ) {
    const uniqueKey = { api_key: createData.api_key };
    debug.write(MessageType.Value, `uniqueKey=${JSON.stringify(uniqueKey)}`);
    debug.write(MessageType.Step, 'Checking unique key...');
    await checkUniqueKey(query, tableName, instanceName, uniqueKey);
  }
  debug.write(MessageType.Step, 'Creating row...');
  const createdRow = (await createRow(query, tableName, createData)) as Row;
  debug.write(MessageType.Exit, `createdRow=${JSON.stringify(createdRow)}`);
  return createdRow;
};

// TODO: query parameters + add actual query to helpers
export const find = async (query: Query) => {
  debug = new Debug(`${debugSource}.find`);
  debug.write(MessageType.Entry);
  debug.write(MessageType.Step, 'Finding rows...');
  const rows = (await query(`SELECT * FROM ${tableName} ORDER BY user_uuid`))
    .rows as Row[];
  debug.write(
    MessageType.Exit,
    `rows(${debugRows})=${JSON.stringify(rows.slice(0, debugRows))}`,
  );
  return rows;
};

export const findOne = async (query: Query, primaryKey: PrimaryKey) => {
  debug = new Debug(`${debugSource}.findOne`);
  debug.write(MessageType.Entry, `primaryKey=${JSON.stringify(primaryKey)}`);
  debug.write(MessageType.Step, 'Finding row by primary key...');
  const row = (await findByPrimaryKey(
    query,
    tableName,
    instanceName,
    primaryKey,
  )) as Row;
  debug.write(MessageType.Exit, `row=${JSON.stringify(row)}`);
  return row;
};

export const update = async (
  query: Query,
  primaryKey: PrimaryKey,
  updateData: UpdateData,
) => {
  debug = new Debug(`${debugSource}.update`);
  debug.write(
    MessageType.Entry,
    `primaryKey=${JSON.stringify(primaryKey)};updateData=${JSON.stringify(updateData)}`,
  );
  debug.write(MessageType.Step, 'Finding row by primary key...');
  const row = (await findByPrimaryKey(
    query,
    tableName,
    instanceName,
    primaryKey,
    true,
  )) as Row;
  debug.write(MessageType.Value, `row=${JSON.stringify(row)}`);
  const mergedRow: Row = Object.assign({}, row, updateData);
  let updatedRow: Row = Object.assign({}, mergedRow);
  if (
    !objectsEqual(pick(mergedRow, dataColumnNames), pick(row, dataColumnNames))
  ) {
    debug.write(MessageType.Step, 'Validating data...');
    if (
      typeof updateData.api_key !== 'undefined' &&
      updateData.api_key !== null
    ) {
      const uniqueKey = { api_key: updateData.api_key };
      debug.write(MessageType.Value, `uniqueKey=${JSON.stringify(uniqueKey)}`);
      debug.write(MessageType.Step, 'Checking unique key...');
      await checkUniqueKey(query, tableName, instanceName, uniqueKey);
    }
    debug.write(MessageType.Step, 'Updating row...');
    updatedRow = (await updateRow(
      query,
      tableName,
      primaryKey,
      updateData,
    )) as Row;
  }
  debug.write(MessageType.Exit, `updatedRow=${JSON.stringify(updatedRow)}`);
  return updatedRow;
};

export const delete_ = async (query: Query, primaryKey: PrimaryKey) => {
  debug = new Debug(`${debugSource}.delete`);
  debug.write(MessageType.Entry, `primaryKey=${JSON.stringify(primaryKey)}`);
  debug.write(MessageType.Step, 'Finding row by primary key...');
  const row = (await findByPrimaryKey(
    query,
    tableName,
    instanceName,
    primaryKey,
    true,
  )) as Row;
  debug.write(MessageType.Value, `row=${JSON.stringify(row)}`);
  debug.write(MessageType.Step, 'Deleting row...');
  await deleteRow(query, tableName, primaryKey);
};
