import { createContext } from 'react';

type WalletContextType = {
    chrome: any;
    account: any;
    setAccount: any;
    networkStats: any;
    wallet: any;
    etherBalance: any;
    provider: any;
}

export const WalletContext =
    createContext<WalletContextType | null>(null)