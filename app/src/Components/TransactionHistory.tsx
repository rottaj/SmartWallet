import { useState, useEffect, useContext } from "react"
import { AccountContext } from "../contexts";
import {
    Box,
    Heading,
    Flex,
    Text,
    HStack,
    useDisclosure
} from "@chakra-ui/react"
import PastTransactionModal from "./Modals/PastTransactionModal";
import { fetchRecentTransactions } from "../utils/etherscan/FetchRecentTransactions";
import { FiSend, FiRepeat } from 'react-icons/fi';
import { ethers } from "ethers";
import { AiFillCodeSandboxCircle } from "react-icons/ai";

const TransactionHistory = () => {

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


    const getDate = () => {
        console.log(txn.timeStamp)
        var date = new Date(txn.timeStamp * 1000);
        console.log(date, String(date).length)
        //return (date)
        return String(date).substr(4, 6)
    }

    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box
            border="1px solid black"
            my="5px"
            py="10px"
            px="5px"
            onClick={onOpen}
            textAlign="left"
            borderRadius="15px"
        >
            <PastTransactionModal txn={txn} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
            {/*<Heading fontSize="20px">{txn.hash.substr(0, 28)}...</Heading> */}
            <HStack spacing="200px">
                <Flex>
                    <Box pt="18px" pr="5px">
                        {txn.to != "" ?
                            <FiSend fontSize="30px"/>
                        :
                            <FiRepeat fontSize="30px"/>
                        }
                    </Box>
                    <Box>
                        {txn.to != "" ?
                            <Text fontSize="20px">Send</Text> 
                            :
                            <Text fontSize="20px">Contract Interaction</Text>
                        }
                    </Box>
                </Flex>
                <Box>
                    <Text>-{parseFloat(String(ethers.utils.formatEther(txn.value))).toFixed(2)} ETH</Text>
                </Box>
            </HStack>
            {txn.to != "" ?
                <Text>To: {txn.to.substr(0, 9)}...</Text>
            :
                <Text>To: {txn.contractAddress.substr(0, 9)}...</Text>
            }
            <Flex margin="0">
                <Text color="green">{getDate()} </Text>
                {txn.to != "" || txn.contractAddress != ""?
                <Text pl="10px">To: {txn.to.substr(0,8)}...</Text>
                :
                <Text pl="10px">From: {txn.from.substr(0,8)}...</Text>
                }
            </Flex>
        </Box>
    )
}

export default TransactionHistory;