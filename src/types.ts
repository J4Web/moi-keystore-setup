export interface GuardianAccount {
    keystore: string;
    enckey: string;
}[]


export interface FaucetAccount extends GuardianAccount {
    address: string;
}