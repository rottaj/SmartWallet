import { ethers } from 'ethers';

const ETHERSCAN_API_NFT_TXN =
  "https://api-rinkeby.etherscan.io/api?module=account&action=tokennfttx&address=";
const ETHERSCAN_API_ABI =
  "https://api.etherscan.io/api?module=contract&action=getabi&address=";
//&apikey=YourApiKeyToken

const ETHERSCAN_API_ETH_BALANCE = 'https://api-rinkeby.etherscan.io/api?module=account&action=balance&address=';



export const getUserERC20Tokens = async () => {
}

export const getEthereumBalance = async (address: any) => {
    const url = ETHERSCAN_API_ETH_BALANCE + address + '&tag=latest&apikey='+process.env.REACT_APP_ETHERSCAN_API_KEY;
    let response = await fetch(url)
    const data = await response.json()
    return parseFloat(ethers.utils.formatUnits(data.result, 'ether')).toFixed(5)

}
