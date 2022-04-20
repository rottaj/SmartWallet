import { createContext } from 'react';

type WalletContextType = {
    chrome: any;
    accounts: any;
    isLoggedIn: any;
    setIsLoggedIn: any;
    setAccounts: any;
    currentAccount: any;
    setCurrentAccount: any;
    networkStats: any;
    wallet: any;
    etherBalance: any;
    provider: any;
}

export const WalletContext =
    createContext<WalletContextType | null>(null)