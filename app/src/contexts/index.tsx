import { createContext } from 'react';

type WalletContextType = {
    chrome: any;
    accounts: any;
    setAccounts: any;
    currentAccount: any;
    setCurrentAccount: any;
    networkStats: any;
    isLocked: any;
    setIsLocked: any;
    wallet: any;
    etherBalance: any;
    setEtherBalance: any;
    provider: any;
}

export const WalletContext =
    createContext<WalletContextType | null>(null)