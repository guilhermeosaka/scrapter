#!/usr/bin/env node

import { program } from 'commander';
import config from 'config';
import { run } from './engine'

program
    .command('run <script> [site]')
    .description('Runs a given script targeting an environment')
    .option('-e, --env <env>', 'selects an environment to run [local, qas, prd]', config.get('scrapter.cmd.defaults.env'))
    .action(run);

program.parse();