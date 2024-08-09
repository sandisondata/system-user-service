import { Query } from 'database';
import {
  checkPrimaryKey,
  checkUniqueKey,
  findByPrimaryKey,
  createRow,
  updateRow,
  deleteRow,
} from 'database-helpers';

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
  await checkPrimaryKey(query, tableName, instanceName, {
    user_uuid: createData.user_uuid,
  });
  if (createData.api_key !== null) {
    await checkUniqueKey(query, tableName, instanceName, {
      api_key: createData.api_key,
    });
  }
  const current = await createRow(query, tableName, createData);
  return current;
};

const update = async (
  query: Query,
  primaryKey: PrimaryKey,
  updateData: UpdateData,
) => {
  const previous = await findByPrimaryKey(
    query,
    tableName,
    instanceName,
    primaryKey,
    true,
  );
  const current = Object.assign({}, previous, updateData);
  // Check current <> previous
  if (![null, current.api_key].includes(updateData.api_key)) {
    await checkUniqueKey(query, tableName, instanceName, {
      api_key: updateData.api_key,
    });
  }
  await updateRow(query, tableName, primaryKey, updateData);
  return current;
};

const del = async (query: Query, primaryKey: PrimaryKey) => {
  await findByPrimaryKey(query, tableName, instanceName, primaryKey, true);
  await deleteRow(query, tableName, primaryKey);
};

export { create, update, del as delete };
