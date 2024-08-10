import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';

import { Debug } from 'node-debug';
import { Database } from 'database';
import * as service from '../dist/index';

describe('main', () => {
  Debug.initialise(':11');
  let database: Database;
  before(async () => {
    database = Database.getInstance();
  });
  it('should pass', async () => {
    // { user_uuid: '666c851b-1201-4912-a29a-853c40dc2d19' }
    await service.find(database.query);
    assert.equal(1, 1);
  });
  after(async () => {});
});
