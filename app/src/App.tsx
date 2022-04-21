import { useState, useEffect } from "react";
import {
  Box,
  Heading
} from "@chakra-ui/react";
import TopHeading from "./Components/TopHeading";
import AccountPanel from "./Components/AccountPanel";
import PortfolioForecast from "./Components/PorfolioForecast";
//import { getEthereumBalance } from "./utils/HandleUserTokens";
import { handleWalletConnection } from "./utils/HandleWalletConnection";
import { WalletContext } from "./contexts";
import TransactionPanel from "./Components/TransactionPanel";
import { ethers } from "ethers";
import { getNetworkStats } from "./utils/HandleNetworkStats";
import TransactionHistory from "./Components/TransactionHistory";
import BaseContainer from "./Containers/BaseContainer";

const alchemy_url: any = process.env.REACT_APP_ALCHEMY_RPC;

declare let chrome: any;
const App = () => {
    const [ isLoadingUser, setIsLoadingUser ]: any = useState();
    const [ isLoadingEtherBalance, setIsLoadingEtherBalance ]: any = useState()
    const [ provider, setProvider ]: any = useState();
    const [ accounts, setAccounts ]: any = useState({});
    const [ currentAccount, setCurrentAccount ]: any = useState();
    const [ wallet, setWallet ]: any = useState();
    const [ networkStats, setNetworkStats ]: any = useState({});
    const [ etherBalance, setEtherBalance ]: any = useState();
    const [ isLocked, setIsLocked]: any = useState();
    useEffect(() => { // refactor when adding chrome.storage

      const mountData = async () => {

        const networkStat = await getNetworkStats();
        setNetworkStats(networkStat);

        chrome.storage.sync.get(null, function(res: any) {
          
          if (res["isInitialized?"]) {
            delete res["isIniitialized?"]
            console.log("FOUND & DELEETED", res)
          }

          setAccounts(res);
        })

        const provider = new ethers.providers.JsonRpcProvider(alchemy_url);
        setProvider(provider);

        /*
        const newWallet = ethers.Wallet.createRandom();
        const wallet = new ethers.Wallet(newWallet.privateKey);
        //const wallet = await handleWalletConnection(priv_key, provider);
        console.log("INIT WALLET", wallet)
        setWallet(wallet)
        */

        chrome.storage.sync.get("isInitialized?", function(res: any) {
          if (Object(res).keys.includes("isInitialized?")) {
              if (res["isInitialized?"] == true) {
                setIsLocked(false);
              } else if (res["isInitialized?"] == false) {
                setIsLocked(true)
              }
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
        currentAccount,
        setCurrentAccount,
        isLocked,
        setIsLocked,
        provider,
        wallet,
        networkStats,
        etherBalance,
        setEtherBalance
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
