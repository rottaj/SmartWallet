import { createContext } from 'react';

type WalletContextType = {
    chrome: any;
    address: any;
    networkStats: any;
    wallet: any;
    etherBalance: any;
    provider: any;
}

export const WalletContext =
    createContext<WalletContextType | null>(null)