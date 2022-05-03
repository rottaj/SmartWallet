import { useState, useEffect, useContext } from "react"
import { WalletContext } from "../contexts";
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
import { FiSend, FiRepeat, FiDownload } from 'react-icons/fi';
import { ethers } from "ethers";
import { AiFillCodeSandboxCircle } from "react-icons/ai";

const TransactionHistory = () => {

    const [ recentTxns, setRecentTxns ]: any = useState([]);
    const { accounts, currentAccount }: any = useContext(WalletContext)


    useEffect(() => {
        const mountData = async () => {
            const txns = await fetchRecentTransactions(accounts[currentAccount].address);
            console.log(txns);
            if (txns != "Error! Invalid address format") {
                setRecentTxns(txns);
            }
        }
        mountData();
    }, [currentAccount])

    return (
        <>
        {currentAccount && 
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
        }
        </>
    )
}


type TransactionProps = {
    txn: any
}

const Transaction = ({ txn } : TransactionProps) => {

    const { accounts, currentAccount }: any = useContext(WalletContext);
    const getDate = () => {
        var date = new Date(txn.timeStamp * 1000);
        //return (date)
        return String(date).substr(4, 6)
    }

    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box
            border="1px solid black"
            my="5px"
            py="10px"
            px="6px"
            onClick={onOpen}
            textAlign="left"
            borderRadius="15px"
        >
            <PastTransactionModal txn={txn} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
            {/*<Heading fontSize="20px">{txn.hash.substr(0, 28)}...</Heading> */}
            <HStack spacing="200px">
                <Flex>
                    <Box pt="18px" pr="5px">
                        {String(txn.to).toUpperCase() != String(accounts[currentAccount].address).toUpperCase() ?
                            <FiSend fontSize="30px"/>
                        :
                        <>
                            {txn.contractAddress == "" ? 
                                 <FiDownload fontSize="30px"/>       
                            :
                                <FiRepeat fontSize="30px"/>
                            }

                        </>
                        }
                    </Box>
                    <Box>
                        {String(txn.to).toUpperCase() == String(accounts[currentAccount].address).toUpperCase() ?
                            <Text fontSize="20px">Receive</Text> 
                            :
                            <>
                            {txn.contractAddress == ""?
                                <Text fontSize="20px">Send</Text> 
                                :
                                <Text fontSize="20px">Contract Interaction</Text>
                            }
                            </>
                        }


                    </Box>
                </Flex>
                <Box>
                    {String(txn.to).toUpperCase() != String(accounts[currentAccount].address).toUpperCase()  ?
                    <Text>-{parseFloat(String(ethers.utils.formatEther(txn.value))).toFixed(2)} ETH</Text>
                    :
                    <Text>+{parseFloat(String(ethers.utils.formatEther(txn.value))).toFixed(2)} ETH</Text>
                    }
                </Box>
            </HStack>
            <Flex margin="0">
                <Text color="green">{getDate()} </Text>
                {String(txn.to).toUpperCase() != String(accounts[currentAccount].address).toUpperCase() ?
                <Text pl="10px">To: {txn.to.substr(0,8)}...</Text>
                :
                <Text pl="10px">From: {txn.from.substr(0,8)}...</Text>
                }
            </Flex>
        </Box>
    )
}

export default TransactionHistory;