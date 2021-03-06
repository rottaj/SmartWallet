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
import { storeCurrentAccount } from "./utils/chrome/StoreCurrentAccount";

const alchemy_url: any = process.env.REACT_APP_ALCHEMY_RPC;

declare let chrome: any;
const App = () => {

    const [ isLoadingUser, setIsLoadingUser ]: any = useState();
    const [ isLoadingEtherBalance, setIsLoadingEtherBalance ]: any = useState()
    const [ provider, setProvider ]: any = useState();
    const [ accounts, setAccounts ]: any = useState({});
    const [ currentAccount, setCurrentAccount ]: any = useState();
    const [ networkStats, setNetworkStats ]: any = useState({});
    const [ etherBalance, setEtherBalance ]: any = useState();
    const [ isLocked, setIsLocked]: any = useState();


    useEffect(() => { // refactor when adding chrome.storage

      const mountData = async () => {

        setIsLoadingUser(true);
        const networkStat = await getNetworkStats();
        setNetworkStats(networkStat);

        chrome.storage.sync.get(null, function(res: any) { // setAccounts if wallet is initialized ( make this better )
          var storage: any = res;
          console.log(res['currentAccount']);
          if (res["isLocked?"] == false) {
            setIsLocked(false);
          } else {
            setIsLocked(true);
          }
          try { // will refactor
            delete storage['isLocked?'];
            delete storage['currentUser'];
            delete storage['passwordHash'];
            setAccounts(storage);
            setCurrentAccount(Object.keys(storage)[0]); // need to add res['currentAccount']
          } catch( e ) {}

          console.log("STORAGE", storage);

        })

        const provider = new ethers.providers.JsonRpcProvider(alchemy_url);
        setProvider(provider);
        setIsLoadingUser(false);
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
        networkStats,
        etherBalance,
        setEtherBalance,
        isLoadingUser
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
