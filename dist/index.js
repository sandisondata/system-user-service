"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repositoryUserService = void 0;
const class_1 = require("./class");
const repositoryUserService = new class_1.RepositoryUserService('repository-user-service', '_users', ['uuid'], ['is_administrator', 'is_enabled', 'is_active', 'api_key']);
exports.repositoryUserService = repositoryUserService;
