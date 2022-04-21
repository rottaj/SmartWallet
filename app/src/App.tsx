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
import BaseContainer from "./Containers/BaseContainer";



declare let chrome: any;
const App = () => {
    const [ isLoadingUser, setIsLoadingUser ]: any = useState();
    const [ isLoadingEtherBalance, setIsLoadingEtherBalance ]: any = useState()
    const [ provider, setProvider ]: any = useState();
    const [ accounts, setAccounts ]: any = useState({});
    const [ currentAccount, setCurrentAccount ]: any = useState();
    const [ wallet, setWallet ]: any = useState();
    const [ networkStats, setNetworkStats ]: any = useState({});
    const [ etherBalance, setEthereBalance ]: any = useState();
    const [ isLoggedIn, setIsLoggedIn]: any = useState();
    const [ isConnected, setIsConnected]: any = useState();
    useEffect(() => { // refactor when adding chrome.storage

      const mountData = async () => {

        const networkStat = await getNetworkStats();
        setNetworkStats(networkStat);

        setIsLoggedIn(true);

        console.log("FOOOOOOBAR")
        chrome.storage.sync.get(null, function(res: any) {
          console.log("ACCOUNTS", res);
          setAccounts(res);
          /*
          chrome.storage.sync.get(res[Object.keys(res)[0]], async function(firstAccount: any) {
            //console.log("TESTING FIRST ACCOUNT", Object.keys(res)[0])
            console.log(firstAccount)
            setCurrentAccount(Object.keys(res)[0]);
            const balance = await getUserEthereumBalance(firstAccount.address);
            setEthereBalance(balance);
          });
          */
         //chrome.storage.sync.remove(Object.keys(res));

        })
        chrome.storage.sync.get("isInitialized?", function(res: any) {
          if (Object(res).keys.includes("isInitialized?")) {
              setIsConnected(true);
          }
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
        isLoggedIn,
        setIsLoggedIn,
        currentAccount,
        setCurrentAccount,
        isConnected,
        setIsConnected,
        provider,
        wallet,
        networkStats,
        etherBalance
      }}>
        <BaseContainer/>
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
      <BaseContainer/>
    </WalletContext.Provider>
  );
}

export default App;
