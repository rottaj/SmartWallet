const ETHERSCAN_API_NFT_TXN =
  "https://api-rinkeby.etherscan.io/api?module=account&action=tokennfttx&address=";
const ETHERSCAN_API_ABI =
  "https://api.etherscan.io/api?module=contract&action=getabi&address=";
//&apikey=YourApiKeyToken

export const getUserERC20Tokens = async () => {
    process.env.ETHERSCAN_API_KEY
}

export const getUserEthereumBalance = async () => {

}
