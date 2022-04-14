const ETHERSCAN_API_GET_TXNS = "https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address="




export const fetchRecentTransactions = async (address: any) => {
    const url = ETHERSCAN_API_GET_TXNS + address + "&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=" + process.env.REACT_APP_ETHERSCAN_API_KEY; 
    console.log(url)
    const res = await fetch(url)
    const data: any = await res.json();
    console.log(data)
    return data.result;
}