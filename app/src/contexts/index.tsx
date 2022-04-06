import { createContext } from 'react';

type AccountContextType = {
    address: any;
    networkStats: any;
}

export const AccountContext =
    createContext<AccountContextType | null>(null)