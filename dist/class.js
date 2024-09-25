"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryUserService = void 0;
const database_helpers_1 = require("database-helpers");
const node_debug_1 = require("node-debug");
const repository_service_class_1 = require("repository-service-class");
class RepositoryUserService extends repository_service_class_1.RepositoryService {
    preCreate() {
        return __awaiter(this, void 0, void 0, function* () {
            const debug = new node_debug_1.Debug(`${this.debugSource}.preCreate`);
            debug.write(node_debug_1.MessageType.Entry);
            if (typeof this.createData.api_key !== 'undefined' &&
                this.createData.api_key !== null) {
                const uniqueKey = { api_key: this.createData.api_key };
                debug.write(node_debug_1.MessageType.Value, `uniqueKey=${JSON.stringify(uniqueKey)}`);
                debug.write(node_debug_1.MessageType.Step, 'Checking unique key...');
                yield (0, database_helpers_1.checkUniqueKey)(this.query, this.tableName, uniqueKey);
            }
            debug.write(node_debug_1.MessageType.Exit);
        });
    }
    preUpdate() {
        return __awaiter(this, void 0, void 0, function* () {
            const debug = new node_debug_1.Debug(`${this.debugSource}.preUpdate`);
            debug.write(node_debug_1.MessageType.Entry);
            if (typeof this.updateData.api_key !== 'undefined' &&
                ![null, this.row.api_key].includes(this.updateData.api_key)) {
                const uniqueKey = { api_key: this.updateData.api_key };
                debug.write(node_debug_1.MessageType.Value, `uniqueKey=${JSON.stringify(uniqueKey)}`);
                debug.write(node_debug_1.MessageType.Step, 'Checking unique key...');
                yield (0, database_helpers_1.checkUniqueKey)(this.query, this.tableName, uniqueKey);
            }
            debug.write(node_debug_1.MessageType.Exit);
        });
    }
}
exports.RepositoryUserService = RepositoryUserService;
