import { Query } from 'database';
import * as db from 'database-helpers';
import { Debug, MessageType } from 'node-debug';
import { objectsEqual, pick } from 'node-utilities';

let debug: Debug;
const debugSource = 'user.service';

const tableName = '_users';
const instanceName = 'user';

type PrimaryKey = { user_uuid: string };

type Data = {
  is_administrator: boolean;
  is_disabled: boolean;
  is_inactive: boolean;
  api_key?: string | null;
};

const dataKeys = ['is_administrator', 'is_disabled', 'is_inactive', 'api_key'];

export type CreateData = PrimaryKey & Data;
export type UpdateData = Partial<Data>;

const create = async (query: Query, createData: CreateData) => {
  debug = new Debug(`${debugSource}.create`);
  debug.write(MessageType.Entry, `createData=${JSON.stringify(createData)}`);
  const primaryKey = { user_uuid: createData.user_uuid };
  debug.write(MessageType.Value, `primaryKey=${JSON.stringify(primaryKey)}`);
  debug.write(MessageType.Step, 'Checking primary key...');
  await db.checkPrimaryKey(query, tableName, instanceName, primaryKey);
  debug.write(MessageType.Step, 'Validating data...');
  if (createData.api_key !== null) {
    const uniqueKey = { api_key: createData.api_key };
    debug.write(MessageType.Value, `uniqueKey=${JSON.stringify(uniqueKey)}`);
    debug.write(MessageType.Step, 'Checking unique key...');
    await db.checkUniqueKey(query, tableName, instanceName, uniqueKey);
  }
  debug.write(MessageType.Step, 'Creating row...');
  const createdRow = await db.createRow(query, tableName, createData);
  debug.write(MessageType.Exit, `createdRow=${JSON.stringify(createdRow)}`);
  return createdRow;
};

// TODO: query parameters + add actual query to helpers
const find = async (query: Query) => {
  debug = new Debug(`${debugSource}.find`);
  debug.write(MessageType.Entry);
  debug.write(MessageType.Step, 'Finding rows...');
  const rows: object[] = (await query(`SELECT * FROM ${tableName}`)).rows;
  debug.write(MessageType.Exit, `rows=${JSON.stringify(rows)}`);
  return rows;
};

const findOne = async (query: Query, primaryKey: PrimaryKey) => {
  debug = new Debug(`${debugSource}.findOne`);
  debug.write(MessageType.Entry, `primaryKey=${JSON.stringify(primaryKey)}`);
  debug.write(MessageType.Step, 'Finding row by primary key...');
  const row = await db.findByPrimaryKey(
    query,
    tableName,
    instanceName,
    primaryKey,
  );
  debug.write(MessageType.Exit, `row=${JSON.stringify(row)}`);
  return row;
};

const update = async (
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
  const row = await db.findByPrimaryKey(
    query,
    tableName,
    instanceName,
    primaryKey,
    true,
  );
  debug.write(MessageType.Value, `row=${JSON.stringify(row)}`);
  const mergedRow = Object.assign({}, row, updateData);
  let updatedRow: object = Object.assign({}, mergedRow);
  if (!objectsEqual(pick(mergedRow, dataKeys), pick(row, dataKeys))) {
    debug.write(MessageType.Step, 'Validating data...');
    if (![null, mergedRow.api_key].includes(updateData.api_key)) {
      const uniqueKey = { api_key: updateData.api_key };
      debug.write(MessageType.Value, `uniqueKey=${JSON.stringify(uniqueKey)}`);
      debug.write(MessageType.Step, 'Checking unique key...');
      await db.checkUniqueKey(query, tableName, instanceName, uniqueKey);
    }
    debug.write(MessageType.Step, 'Updating row...');
    updatedRow = await db.updateRow(query, tableName, primaryKey, updateData);
  }
  debug.write(MessageType.Exit, `updatedRow=${JSON.stringify(updatedRow)}`);
  return updatedRow;
};

const del = async (query: Query, primaryKey: PrimaryKey) => {
  debug = new Debug(`${debugSource}.delete`);
  debug.write(MessageType.Entry, `primaryKey=${JSON.stringify(primaryKey)}`);
  debug.write(MessageType.Step, 'Finding row by primary key...');
  await db.findByPrimaryKey(query, tableName, instanceName, primaryKey, true);
  debug.write(MessageType.Step, 'Deleting row...');
  await db.deleteRow(query, tableName, primaryKey);
};

export { create, find, findOne, update, del as delete };
