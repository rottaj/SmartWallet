import { createContext } from 'react';

type AccountContextType = {
    address: any;
    networkStats: any;
    etherBalance: any;
    provider: any;
}

export const AccountContext =
    createContext<AccountContextType | null>(null)