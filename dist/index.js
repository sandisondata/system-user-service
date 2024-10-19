"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.service = void 0;
const class_1 = require("./class");
exports.service = new class_1.Service('system-user-service', '_users', ['uuid'], ['is_administrator', 'is_enabled', 'is_active', 'api_key'], false);
