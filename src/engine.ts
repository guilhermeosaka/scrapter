import chalk from 'chalk';

const run = async (script: string, site: string, options: RunOptions): Promise<void>  => {
    console.log(`start running script ${chalk.green(script)} on ${chalk.yellow(options.env)}`);
}

export {
    run,
}