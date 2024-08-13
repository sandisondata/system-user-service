import { after, before, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { v4 as uuidv4 } from 'uuid';

import { Debug, MessageType } from 'node-debug';
import { Database } from 'database';
import * as service from '../dist/index';

describe('main', (suiteContext) => {
  Debug.initialise(true);
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
    const createData: service.CreateData = {
      user_uuid: uuid,
      is_administrator: true,
      is_disabled: false,
      is_inactive: false,
    };
    const createdRow = await service.create(database.query, createData);
    assert.equal(createdRow.user_uuid, createData.user_uuid);
    debug.write(MessageType.Exit);
  });
  it('findOne', async (testContext) => {
    debug = new Debug(`${suiteContext.name}.test.${testContext.name}`);
    debug.write(MessageType.Entry);
    const primaryKey: service.PrimaryKey = { user_uuid: uuid };
    const row = await service.findOne(database.query, primaryKey);
    assert.equal(row.user_uuid, primaryKey.user_uuid);
    debug.write(MessageType.Exit);
  });
  it('update', async (testContext) => {
    try {
      debug = new Debug(`${suiteContext.name}.test.${testContext.name}`);
      debug.write(MessageType.Entry);
      await database.transaction(async (query) => {
        const primaryKey: service.PrimaryKey = { user_uuid: uuid };
        const updateData: service.UpdateData = { api_key: '<api_key>' };
        const updatedRow = await service.update(query, primaryKey, updateData);
        assert.equal(updatedRow.user_uuid, primaryKey.user_uuid);
      });
      debug.write(MessageType.Exit);
    } catch (error) {
      console.error(error);
    }
  });
  it('delete', async (testContext) => {
    debug = new Debug(`${suiteContext.name}.test.${testContext.name}`);
    debug.write(MessageType.Entry);
    await database.transaction(async (query) => {
      const primaryKey: service.PrimaryKey = { user_uuid: uuid };
      await service.delete(query, primaryKey);
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
