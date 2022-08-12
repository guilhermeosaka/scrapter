#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const config_1 = __importDefault(require("config"));
const engine_1 = require("./engine");
commander_1.program
    .command('run <script> [site]')
    .description('Runs a given script targeting an environment')
    .option('-e, --env <env>', 'selects an environment to run [local, qas, prd]', config_1.default.get('scrapter.cmd.defaults.env'))
    .action(engine_1.run);
commander_1.program.parse();
