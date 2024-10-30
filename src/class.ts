import { BaseService } from 'base-service-class';
import { checkUniqueKey } from 'database-helpers';
import { Debug, MessageType } from 'node-debug';

export type PrimaryKey = {
  uuid?: string;
};

type Data = {
  is_administrator?: boolean;
  is_enabled?: boolean;
  is_active?: boolean;
  api_key?: string | null;
};

export type CreateData = PrimaryKey & Data;
export type UpdateData = Partial<Data>;
export type Row = Required<PrimaryKey> & Required<Data>;

export class Service extends BaseService<
  PrimaryKey,
  CreateData,
  UpdateData,
  Row
> {
  async preCreate() {
    const debug = new Debug(`${this.debugSource}.preCreate`);
    debug.write(MessageType.Entry);
    if (
      typeof this.createData.api_key != 'undefined' &&
      this.createData.api_key != null
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
      typeof this.updateData.api_key != 'undefined' &&
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
