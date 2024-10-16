"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.systemUserService = void 0;
const class_1 = require("./class");
exports.systemUserService = new class_1.SystemUserService('system-user-service', '_users', ['uuid'], ['is_administrator', 'is_enabled', 'is_active', 'api_key'], false);
