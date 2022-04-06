import { useState, useEffect, createContext } from 'react';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { getUserEthereumBalance } from '../utils/HandleUserTokens';

type AccountContextType = {
    address: any;
    networkStats: any;
    etherBalance: any;
}

export const AccountContext = createContext<AccountContextType | null>({
    address: '',
    networkStats: {},
    etherBalance: 0
})

export const AccountProvider = ({children}: any) => {
    const [ isLoadingUser, setIsLoadingUser ]: any = useState();
    const [ isLoadingEtherBalance, setIsLoadingEtherBalance ]: any = useState()
    const [ address, setAddress ]: any = useState()
    const [ networkStats, setNetworkStats ]: any = useState()
    const [ etherBalance, setEthereBalance ]: any = useState()

    useEffect(() => { // refactor when adding chrome.storage

        getUserEthereumBalance('0x402d8602EF11324bFbB53F7B7Ad3ACf2c02875E5').then((data) => {
            console.log(data)
        });
    }, [])

    return (
        <AccountContext.Provider
            value={{
                address,
                networkStats,
                etherBalance
            }}
        >

        </AccountContext.Provider>
    )

}