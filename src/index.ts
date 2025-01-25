#!/usr/bin/env bun

import { Command } from 'commander';
import { KeystoreGenerator } from './generator';
import { resolve } from 'path';
import { homedir } from 'os';
import chalk from 'chalk';
import ora from 'ora';

const program = new Command();

program
    .name('moi-keystore')
    .description('Generate keystore and setup moi config files for local development!')
    .version('0.0.1');

program
    .command('init')
    .description('Initialize moi keystore')
    .argument('<mnemonic>', 'mnemonic to generate keystore')
    .option('-p, --path <path>', 'Path to generate keystore and config files (default: user home directory)', resolve(homedir()))
    .option('-k, --key-path <keyPath>', 'Key path to generate keystore (default: m/44\'/6174\'/0\'/0/1)', `m/44'/6174'/0'/0/1`)
    .option('-P, --password <password>', 'Password to encrypt keystore (default: 123456)', '123456')
    .action(async (mnemonic, options) => {
        const spinner = ora({ text: 'Generating keystore... ⏳', spinner: 'dots' }).start();
        try {
            const result = await KeystoreGenerator.generate(options.path, mnemonic, options.password, options.keyPath);
            console.log('Keystore generation completed! 🤘🤘');
            console.log(chalk.green(`\nKeystore generated at: ${result.keystorePath}`));
            console.log(chalk.green(`Encryption key generated at: ${result.enckeyPath}\n`));
            process.exit(0);
        } catch (error) {
            spinner.fail('Keystore generation failed.');
            if (error instanceof Error && error.message === "Invalid mnemonic") {
                console.error(chalk.red('Error: The provided mnemonic is invalid. Please check and try again.'));
            } else if (error instanceof Error) {
                console.error(chalk.red(`Error: ${error.message}`));
            } else {
                console.error(chalk.red('An unknown error occurred.'));
            }
            process.exit(1);
        }
    });

program.parse(process.argv);