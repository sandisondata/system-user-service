import { Database } from 'database';
import { Debug, MessageType } from 'node-debug';
import { after, before, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { v4 as uuidv4 } from 'uuid';
import {
  CreateData,
  create,
  delete_,
  find,
  findOne,
  PrimaryKey,
  UpdateData,
  update,
} from '../dist/index';

describe('main', (suiteContext) => {
  Debug.initialise(false);
  let debug: Debug;
  let database: Database;
  let uuid: string;
  before(() => {
    debug = new Debug(`${suiteContext.name}.before`);
    debug.write(MessageType.Entry);
    database = Database.getInstance();
    uuid = uuidv4();
    debug.write(MessageType.Exit);
  });
  it('create', async (testContext) => {
    debug = new Debug(`${suiteContext.name}.test.${testContext.name}`);
    debug.write(MessageType.Entry);
    const createData: CreateData = {
      user_uuid: uuid,
      is_administrator: true,
      is_disabled: false,
      is_inactive: false,
    };
    const createdRow = await create(database.query, createData);
    assert.equal(createdRow.user_uuid, createData.user_uuid);
    debug.write(MessageType.Exit);
  });
  it('find', async (testContext) => {
    debug = new Debug(`${suiteContext.name}.test.${testContext.name}`);
    debug.write(MessageType.Entry);
    const rows = await find(database.query);
    assert.equal(rows.length, 1);
    debug.write(MessageType.Exit);
  });
  it('findOne', async (testContext) => {
    debug = new Debug(`${suiteContext.name}.test.${testContext.name}`);
    debug.write(MessageType.Entry);
    const primaryKey: PrimaryKey = { user_uuid: uuid };
    const row = await findOne(database.query, primaryKey);
    assert.equal(row.user_uuid, primaryKey.user_uuid);
    debug.write(MessageType.Exit);
  });
  it('update', async (testContext) => {
    debug = new Debug(`${suiteContext.name}.test.${testContext.name}`);
    debug.write(MessageType.Entry);
    await database.transaction(async (query) => {
      const primaryKey: PrimaryKey = { user_uuid: uuid };
      const updateData: UpdateData = { api_key: '<api_key>' };
      const updatedRow = await update(query, primaryKey, updateData);
      assert.equal(updatedRow.user_uuid, primaryKey.user_uuid);
    });
    debug.write(MessageType.Exit);
  });
  it('delete', async (testContext) => {
    debug = new Debug(`${suiteContext.name}.test.${testContext.name}`);
    debug.write(MessageType.Entry);
    await database.transaction(async (query) => {
      const primaryKey: PrimaryKey = { user_uuid: uuid };
      await delete_(query, primaryKey);
      assert.notEqual(null, primaryKey.user_uuid);
    });
    debug.write(MessageType.Exit);
  });
  after(async () => {
    debug = new Debug(`${suiteContext.name}.after`);
    debug.write(MessageType.Entry);
    await database.shutdown();
    debug.write(MessageType.Exit);
  });
});
