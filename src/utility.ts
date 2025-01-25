import * as bip39 from 'bip39';


export const isValidMnemonic = (mnemonic: string) => {
    // Check if the mnemonic is a valid BIP39 mnemonic
    return bip39.validateMnemonic(mnemonic);
}