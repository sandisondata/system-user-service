import { Query } from 'database';
import * as dbx from 'database-helpers';
import { Debug, MessageType } from 'node-debug';

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

export type CreateData = PrimaryKey & Data;
export type UpdateData = Partial<Data>;

const create = async (query: Query, createData: CreateData) => {
  const debug = new Debug(`${debugSource}.create`);
  debug.write(MessageType.Entry, `createData=${JSON.stringify(createData)}`);
  const primaryKey = { user_uuid: createData.user_uuid };
  debug.write(MessageType.Value, `primaryKey=${JSON.stringify(primaryKey)}`);
  debug.write(MessageType.Step, 'Checking primary key...');
  await dbx.checkPrimaryKey(query, tableName, instanceName, primaryKey);
  if (createData.api_key !== null) {
    const uniqueKey = { api_key: createData.api_key };
    debug.write(MessageType.Value, `uniqueKey=${JSON.stringify(uniqueKey)}`);
    debug.write(MessageType.Step, 'Checking unique key...');
    await dbx.checkUniqueKey(query, tableName, instanceName, uniqueKey);
  }
  debug.write(MessageType.Step, 'Creating row...');
  const createdRow = await dbx.createRow(query, tableName, createData);
  debug.write(MessageType.Exit, `createdRow=${JSON.stringify(createdRow)}`);
  return createdRow;
};

const update = async (
  query: Query,
  primaryKey: PrimaryKey,
  updateData: UpdateData,
) => {
  const debug = new Debug(`${debugSource}.update`);
  debug.write(
    MessageType.Entry,
    `primaryKey=${JSON.stringify(primaryKey)};updateData=${JSON.stringify(updateData)}`,
  );
  debug.write(MessageType.Step, 'Finding by primary key...');
  const row = await dbx.findByPrimaryKey(
    query,
    tableName,
    instanceName,
    primaryKey,
    true,
  );
  debug.write(MessageType.Value, `row=${JSON.stringify(row)}`);
  const mergedRow = Object.assign({}, row, updateData);
  debug.write(MessageType.Value, `mergedRow=${JSON.stringify(mergedRow)}`);
  let updatedRow = Object.assign({}, mergedRow);
  // Check mergedRow <> row
  if (mergedRow !== row) {
    if (![null, mergedRow.api_key].includes(updateData.api_key)) {
      const uniqueKey = { api_key: updateData.api_key };
      debug.write(MessageType.Value, `uniqueKey=${JSON.stringify(uniqueKey)}`);
      debug.write(MessageType.Step, 'Checking unique key...');
      await dbx.checkUniqueKey(query, tableName, instanceName, uniqueKey);
    }
    debug.write(MessageType.Step, 'Updating row...');
    updatedRow = await dbx.updateRow(query, tableName, primaryKey, updateData);
  }
  debug.write(MessageType.Exit, `updatedRow=${JSON.stringify(updatedRow)}`);
  return updatedRow;
};

const del = async (query: Query, primaryKey: PrimaryKey) => {
  const debug = new Debug(`${debugSource}.delete`);
  debug.write(MessageType.Entry, `primaryKey=${JSON.stringify(primaryKey)}`);
  debug.write(MessageType.Step, 'Finding by primary key...');
  await dbx.findByPrimaryKey(query, tableName, instanceName, primaryKey, true);
  debug.write(MessageType.Step, 'Deleting row...');
  await dbx.deleteRow(query, tableName, primaryKey);
};

export { create, update, del as delete };
