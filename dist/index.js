"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.delete = exports.update = exports.findOne = exports.find = exports.create = void 0;
const db = __importStar(require("database-helpers"));
const node_debug_1 = require("node-debug");
const node_utilities_1 = require("node-utilities");
let debug;
const debugSource = 'user.service';
const tableName = '_users';
const instanceName = 'user';
const dataKeys = ['is_administrator', 'is_disabled', 'is_inactive', 'api_key'];
const create = (query, createData) => __awaiter(void 0, void 0, void 0, function* () {
    debug = new node_debug_1.Debug(`${debugSource}.create`);
    debug.write(node_debug_1.MessageType.Entry, `createData=${JSON.stringify(createData)}`);
    const primaryKey = { user_uuid: createData.user_uuid };
    debug.write(node_debug_1.MessageType.Value, `primaryKey=${JSON.stringify(primaryKey)}`);
    debug.write(node_debug_1.MessageType.Step, 'Checking primary key...');
    yield db.checkPrimaryKey(query, tableName, instanceName, primaryKey);
    debug.write(node_debug_1.MessageType.Step, 'Validating data...');
    if (createData.api_key !== null) {
        const uniqueKey = { api_key: createData.api_key };
        debug.write(node_debug_1.MessageType.Value, `uniqueKey=${JSON.stringify(uniqueKey)}`);
        debug.write(node_debug_1.MessageType.Step, 'Checking unique key...');
        yield db.checkUniqueKey(query, tableName, instanceName, uniqueKey);
    }
    debug.write(node_debug_1.MessageType.Step, 'Creating row...');
    const createdRow = yield db.createRow(query, tableName, createData);
    debug.write(node_debug_1.MessageType.Exit, `createdRow=${JSON.stringify(createdRow)}`);
    return createdRow;
});
exports.create = create;
// TODO: query parameters + add actual query to helpers
const find = (query) => __awaiter(void 0, void 0, void 0, function* () {
    debug = new node_debug_1.Debug(`${debugSource}.find`);
    debug.write(node_debug_1.MessageType.Entry);
    debug.write(node_debug_1.MessageType.Step, 'Finding rows...');
    const rows = (yield query(`SELECT * FROM ${tableName}`)).rows;
    debug.write(node_debug_1.MessageType.Exit, `rows=${JSON.stringify(rows)}`);
    return rows;
});
exports.find = find;
const findOne = (query, primaryKey) => __awaiter(void 0, void 0, void 0, function* () {
    debug = new node_debug_1.Debug(`${debugSource}.findOne`);
    debug.write(node_debug_1.MessageType.Entry, `primaryKey=${JSON.stringify(primaryKey)}`);
    debug.write(node_debug_1.MessageType.Step, 'Finding row by primary key...');
    const row = yield db.findByPrimaryKey(query, tableName, instanceName, primaryKey);
    debug.write(node_debug_1.MessageType.Exit, `row=${JSON.stringify(row)}`);
    return row;
});
exports.findOne = findOne;
const update = (query, primaryKey, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    debug = new node_debug_1.Debug(`${debugSource}.update`);
    debug.write(node_debug_1.MessageType.Entry, `primaryKey=${JSON.stringify(primaryKey)};updateData=${JSON.stringify(updateData)}`);
    debug.write(node_debug_1.MessageType.Step, 'Finding row by primary key...');
    const row = yield db.findByPrimaryKey(query, tableName, instanceName, primaryKey, true);
    debug.write(node_debug_1.MessageType.Value, `row=${JSON.stringify(row)}`);
    const mergedRow = Object.assign({}, row, updateData);
    let updatedRow = Object.assign({}, mergedRow);
    if (!(0, node_utilities_1.objectsEqual)((0, node_utilities_1.pick)(mergedRow, dataKeys), (0, node_utilities_1.pick)(row, dataKeys))) {
        debug.write(node_debug_1.MessageType.Step, 'Validating data...');
        if (![null, mergedRow.api_key].includes(updateData.api_key)) {
            const uniqueKey = { api_key: updateData.api_key };
            debug.write(node_debug_1.MessageType.Value, `uniqueKey=${JSON.stringify(uniqueKey)}`);
            debug.write(node_debug_1.MessageType.Step, 'Checking unique key...');
            yield db.checkUniqueKey(query, tableName, instanceName, uniqueKey);
        }
        debug.write(node_debug_1.MessageType.Step, 'Updating row...');
        updatedRow = yield db.updateRow(query, tableName, primaryKey, updateData);
    }
    debug.write(node_debug_1.MessageType.Exit, `updatedRow=${JSON.stringify(updatedRow)}`);
    return updatedRow;
});
exports.update = update;
const del = (query, primaryKey) => __awaiter(void 0, void 0, void 0, function* () {
    debug = new node_debug_1.Debug(`${debugSource}.delete`);
    debug.write(node_debug_1.MessageType.Entry, `primaryKey=${JSON.stringify(primaryKey)}`);
    debug.write(node_debug_1.MessageType.Step, 'Finding row by primary key...');
    yield db.findByPrimaryKey(query, tableName, instanceName, primaryKey, true);
    debug.write(node_debug_1.MessageType.Step, 'Deleting row...');
    yield db.deleteRow(query, tableName, primaryKey);
});
exports.delete = del;
