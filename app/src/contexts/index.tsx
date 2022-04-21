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
    etherBalance: any;
    setEtherBalance: any;
    provider: any;
    isLoadingUser: any;
}

export const WalletContext =
    createContext<WalletContextType | null>(null)