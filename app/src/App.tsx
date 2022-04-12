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
import { AccountContext } from "./contexts";
import TransactionPanel from "./Components/TransactionPanel";
import { ethers } from "ethers";
import { getNetworkStats } from "./utils/HandleNetworkStats";

const alchemy_url: any = process.env.REACT_APP_ALCHEMY_RPC;

const App = () => {
    const [ isLoadingUser, setIsLoadingUser ]: any = useState();
    const [ isLoadingEtherBalance, setIsLoadingEtherBalance ]: any = useState()
    const [ provider, setProvider ]: any = useState();
    const [ address, setAddress ]: any = useState();
    const [ wallet, setWallet ]: any = useState();
    const [ networkStats, setNetworkStats ]: any = useState({});
    const [ etherBalance, setEthereBalance ]: any = useState();
  
    useEffect(() => { // refactor when adding chrome.storage

      const mountData = async () => {
        const balance = await getUserEthereumBalance('0xB702DC679dCe8d27c77AC49A63B9A138B674929E')
        const networkStat = await getNetworkStats();

        const provider = new ethers.providers.JsonRpcProvider(alchemy_url)
        setProvider(provider)
        setAddress("0xB702DC679dCe8d27c77AC49A63B9A138B674929E") // just for testing
        const wallet = handleWalletConnection(process.env.PRIV_KEY, provider);
        console.log("WALLET", wallet)
        setEthereBalance(balance)
        setNetworkStats(networkStat);


      }

      mountData();
    }, [])





  return (
    <AccountContext.Provider
      value={{
        address,
        provider,
        wallet,
        networkStats,
        etherBalance
      }}>
    <Box
      height="800px"
      width="400px"
      textAlign="center"
      borderRadius="20px"
    >
      <TopHeading/>
      <AccountPanel/>
      <PortfolioForecast/>
      <TransactionPanel/>
    </Box>
    </AccountContext.Provider>
  );
}

export default App;
