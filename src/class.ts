import { checkUniqueKey } from 'database-helpers';
import { Debug, MessageType } from 'node-debug';
import { RepositoryService } from 'repository-service-class';
export { CreateData, Query, Row, UpdateData } from 'repository-service-class';

export type PrimaryKey = {
  uuid?: string;
};

export type Data = {
  is_administrator?: boolean;
  is_enabled?: boolean;
  is_active?: boolean;
  api_key?: string | null;
};

export class RepositoryUserService extends RepositoryService<PrimaryKey, Data> {
  async preCreate() {
    const debug = new Debug(`${this.debugSource}.preCreate`);
    debug.write(MessageType.Entry);
    if (
      typeof this.createData.api_key !== 'undefined' &&
      this.createData.api_key !== null
    ) {
      const uniqueKey = { api_key: this.createData.api_key };
      debug.write(MessageType.Value, `uniqueKey=${JSON.stringify(uniqueKey)}`);
      debug.write(MessageType.Step, 'Checking unique key...');
      await checkUniqueKey(this.query, this.tableName, uniqueKey);
    }
    debug.write(MessageType.Exit);
  }

  async preUpdate() {
    const debug = new Debug(`${this.debugSource}.preUpdate`);
    debug.write(MessageType.Entry);
    if (
      typeof this.updateData.api_key !== 'undefined' &&
      ![null, this.row.api_key].includes(this.updateData.api_key)
    ) {
      const uniqueKey = { api_key: this.updateData.api_key };
      debug.write(MessageType.Value, `uniqueKey=${JSON.stringify(uniqueKey)}`);
      debug.write(MessageType.Step, 'Checking unique key...');
      await checkUniqueKey(this.query, this.tableName, uniqueKey);
    }
    debug.write(MessageType.Exit);
  }
}
