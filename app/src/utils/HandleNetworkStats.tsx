const ETHERSCAN_LAST_PRICE_URL = "https://api.etherscan.io/api?module=stats&action=ethprice&apikey="

export const getNetworkStats = async () => {
    const result = await fetch(ETHERSCAN_LAST_PRICE_URL + process.env.REACT_APP_ETHERSCAN_API_KEY)
    const data = await result.json();
    return data.result;
}