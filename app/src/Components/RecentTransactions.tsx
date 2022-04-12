import { useState, useEffect, useContext } from "react"
import { AccountContext } from "../contexts";
import {
    Box,
    Heading
} from "@chakra-ui/react"
import { fetchRecentTransactions } from "../utils/etherscan/FetchRecentTransactions";

const RecentTransactions = () => {

    const [ recentTxns, setRecentTxns ]: any = useState([]);
    const { address }: any = useContext(AccountContext)

    useEffect(() => {
        const mountData = async () => {
            const txns = await fetchRecentTransactions(address);
            console.log(txns);
            setRecentTxns(txns);
        }
        mountData();
    }, [])

    return (
        <Box
            px="20px"
        >
            {recentTxns && 
                <>
                {recentTxns.map((txn: any) => {
                    return (
                        <Transaction txnContent={txn}/>
                    )
                })}
                </>
            }
        </Box>
    )
}


type TransactionProps = {
    txnContent: any
}

const Transaction = (props: TransactionProps) => {
    return (
        <Box >
            <Heading fontSize="20px">{props.txnContent.hash}</Heading>
        </Box>
    )
}

export default RecentTransactions;