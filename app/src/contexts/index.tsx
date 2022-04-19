import { createContext } from 'react';

type AccountContextType = {
    chrome: any;
    address: any;
    networkStats: any;
    wallet: any;
    etherBalance: any;
    provider: any;
}

export const AccountContext =
    createContext<AccountContextType | null>(null)