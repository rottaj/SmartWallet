import { useState, useEffect } from "react";
import {
  Box,
  Heading
} from "@chakra-ui/react";
import TopHeading from "./Components/TopHeading";
import AccountPanel from "./Components/AccountPanel";
import PortfolioForecast from "./Components/PorfolioForecast";
import { getUserEthereumBalance } from "./utils/HandleUserTokens";
import { handleWalletConnection } from "./utils/HandleWalletConnection";
import { WalletContext } from "./contexts";
import TransactionPanel from "./Components/TransactionPanel";
import { ethers } from "ethers";
import { getNetworkStats } from "./utils/HandleNetworkStats";
import TransactionHistory from "./Components/TransactionHistory";

const alchemy_url: any = process.env.REACT_APP_ALCHEMY_RPC;
const priv_key: any = process.env.REACT_APP_PRIV_KEY;

declare let chrome: any;
const App = () => {
    const [ isLoadingUser, setIsLoadingUser ]: any = useState();
    const [ isLoadingEtherBalance, setIsLoadingEtherBalance ]: any = useState()
    const [ provider, setProvider ]: any = useState();
    const [ accounts, setAccounts ]: any = useState();
    const [ currentAccount, setCurrentAccount ]: any = useState();
    const [ wallet, setWallet ]: any = useState();
    const [ networkStats, setNetworkStats ]: any = useState({});
    const [ etherBalance, setEthereBalance ]: any = useState();
  
    useEffect(() => { // refactor when adding chrome.storage

      const mountData = async () => {

        const networkStat = await getNetworkStats();

        const provider = new ethers.providers.JsonRpcProvider(alchemy_url)
        setProvider(provider)
        //setAddress("0xB702DC679dCe8d27c77AC49A63B9A138B674929E") // just for testing

        const wallet = await handleWalletConnection(priv_key, provider);
        setWallet(wallet)
        setNetworkStats(networkStat);
        chrome.storage.sync.get(null, function(res: any) {
            console.log("ACCOUNTS", res)
            setAccounts(res)
            /*
            chrome.storage.sync.get(null, function(userAccounts: any) {
                const accountKeys = Object.keys(userAccounts);
                accountKeys.map((account: any) => {
                    chrome.storage.sync.get(account, function(res: any) {
                        console.log("FOobar", res)
                        setAccounts((accounts: any) => [res, ...accounts])
                    })
                })
            })
            */
            chrome.storage.sync.get(res[Object.keys(res)[0]], async function(firstAccount: any) {
              console.log("TESTING FIRST ACCOUNT", firstAccount)
              setCurrentAccount(firstAccount);
              const balance = await getUserEthereumBalance(firstAccount.address)
              setEthereBalance(balance)
            })
        })
      }

      mountData();
    }, [])





  return (
    <WalletContext.Provider
      value={{
        chrome,
        accounts,
        setAccounts,
        currentAccount,
        setCurrentAccount,
        provider,
        wallet,
        networkStats,
        etherBalance
      }}>
    <Box
      height="1200px"
      width="400px"
      textAlign="center"
      borderRadius="20px"
    >
      <TopHeading/>
      <AccountPanel/>
      <PortfolioForecast/>
      <TransactionPanel/>
      <TransactionHistory/>
    </Box>
    </WalletContext.Provider>
  );
}

export default App;
