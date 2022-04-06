const ETHERSCAN_API_NFT_TXN =
  "https://api-rinkeby.etherscan.io/api?module=account&action=tokennfttx&address=";
const ETHERSCAN_API_ABI =
  "https://api.etherscan.io/api?module=contract&action=getabi&address=";
//&apikey=YourApiKeyToken

const ETHERSCAN_API_ETH_BALANCE = 'https://api.etherscan.io/api?module=account&action=balance&address=';



export const getUserERC20Tokens = async () => {
}

export const getUserEthereumBalance = async (address: any) => {
    const url = ETHERSCAN_API_ETH_BALANCE + address + '&tag=latest&apikey='+process.env.REACT_APP_ETHERSCAN_API_KEY;
    fetch(url).then((res) => {return res.json().then((data) => {
        console.log(data)
        return data
    })})
}
