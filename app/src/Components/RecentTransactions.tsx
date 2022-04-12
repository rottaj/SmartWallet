import { useState, useEffect, useContext } from "react"
import { AccountContext } from "../contexts";
import {
    Box,
    Heading,
    useDisclosure
} from "@chakra-ui/react"
import PastTransactionModal from "./Modals/PastTransactionModal";
import { fetchRecentTransactions } from "../utils/etherscan/FetchRecentTransactions";

const RecentTransactions = () => {

    const [ recentTxns, setRecentTxns ]: any = useState([]);
    const { address }: any = useContext(AccountContext)


    useEffect(() => {
        const mountData = async () => {
            const txns = await fetchRecentTransactions(address);
            console.log(txns);
            if (txns != "Error! Invalid address format") {
                setRecentTxns(txns);
            }
        }
        mountData();
    }, [address])

    return (
        <Box
            pt="30px"
            px="5px"
        >
            {recentTxns && 
                <>
                {recentTxns.map((txn: any) => {
                    return (
                        <>
                        <Transaction txn={txn}/>
                        </>
                    )
                })}
                </>
            }
        </Box>
    )
}


type TransactionProps = {
    txn: any
}

const Transaction = ({ txn } : TransactionProps) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box
            border="1px solid black"
            my="3px"
            onClick={onOpen}
        >
            <PastTransactionModal txn={txn} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
            <Heading fontSize="20px">{txn.hash.substr(0, 28)}...</Heading>
        </Box>
    )
}

export default RecentTransactions;