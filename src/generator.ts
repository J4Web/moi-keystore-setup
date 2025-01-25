import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import path from 'path'
import { Wallet } from 'js-moi-sdk';
import { isValidMnemonic } from './utility';
import type { FaucetAccount, GuardianAccount } from './types';
import { homedir } from 'os'



export class KeystoreGenerator {
    static async generate(
        basePath: string,
        mnemonic: string,
        password: string = "123456",
        keyPath: string = `m/44'/6174'/0'/0/1`
    ) {

        if (!isValidMnemonic(mnemonic)) {
            throw new Error("Invalid mnemonic");
        }

        const moiPath = path.resolve(basePath, '.moi');


        //ensure path exists
        this.ensurePathExists(moiPath);

        //generate paths
        const keystorePath = path.resolve(moiPath, 'keystore.json');
        const enckeyPath = path.resolve(moiPath, 'enckey.txt');

        //generate enckey
        writeFileSync(enckeyPath, password);


        //generate keystore 
        const wallet = await Wallet.fromMnemonic(mnemonic, keyPath);
        const keystore = wallet.generateKeystore(password);
        const jsonKeystore = JSON.stringify(keystore);
        const address = wallet.getAddress();

        writeFileSync(keystorePath, jsonKeystore);

        //update the config files
        this.updateGuardianConfig(moiPath, keystorePath, enckeyPath);
        this.updateFaucetConfig(moiPath, keystorePath, enckeyPath, address);
        return { keystorePath, enckeyPath };
    }

    private static updateGuardianConfig(moiPath: string, keystorePath: string, enckeyPath: string) {
        const configPath = path.join(moiPath, 'guardians_accounts.json');
        const basePath = homedir();
        const relativePaths = {
            keystore: path.relative(basePath, keystorePath),
            enckey: path.relative(basePath, enckeyPath)
        }

        const config: GuardianAccount[] = existsSync(configPath) ? JSON.parse(readFileSync(configPath, 'utf-8')) : [];

        config.push(relativePaths);
        writeFileSync(configPath, JSON.stringify(config, null, 2));
    }


    private static updateFaucetConfig(moiPath: string, keystorePath: string, enckeyPath: string, address: string) {
        const configPath = path.join(moiPath, 'accounts.json');
        const basePath = homedir();
        const relativePaths = {
            keystore: path.relative(basePath, keystorePath),
            enckey: path.relative(basePath, enckeyPath),
            address
        }

        const config: FaucetAccount[] = existsSync(configPath) ? JSON.parse(readFileSync(configPath, 'utf-8')) : [];

        config.push(relativePaths);
        writeFileSync(configPath, JSON.stringify(config, null, 2));
    }
    private static ensurePathExists(path: string) {
        if (!existsSync(path)) {
            mkdirSync(path, { recursive: true });
        }
    }
}
