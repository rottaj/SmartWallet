import { ethers } from 'ethers';
import { useState, useEffect, useContext } from 'react';
import {
    Box,
    Heading,
    Flex,
    Text,
    Input,
    HStack,
    Button,
    Modal,
    ModalBody,
    ModalOverlay,
    ModalContent
} from "@chakra-ui/react";
import { AccountContext } from '../contexts';
import { FaEthereum } from 'react-icons/fa';

type TransactionModalProps = {
    isOpen: any;
    onOpen: any;
    onClose: any;
}

const TransactionModal = ({isOpen, onOpen, onClose}: TransactionModalProps) => {

    const [ recipientAddress, setRecipientAddress ]: any = useState()
    const [ txnIsOpen, setTxnIsOpen ]: any = useState();
    const [ sendingEther, setSendingEther ]: any = useState();
    const [ currentGasPrice, setCurrentGasPrice ]: any = useState();
    const { address, etherBalance, provider }: any = useContext(AccountContext);

    const checkValidEthereumAddress = (address: string) => {
        try {
            if (ethers.utils.getAddress(address)) {
                setRecipientAddress(address)
            } 
        } catch(error) {} 
    }


    const getCurrentGasPrice = async () => {
        //let signer = provider.getSigner();
        const txn = createTransaction();
        console.log(txn)
        let gasPrice = await provider.estimateGas(txn);
        //console.log(String(ethers.utils.formatUnits(gasPrice, "gwei")))
        setCurrentGasPrice(ethers.utils.formatUnits(gasPrice, "gwei"));
    }

    const createTransaction = () => {
        const txn = {
            from: address,
            to: recipientAddress,
            //gasLimit: "21000",
            //maxFeePerGas: "300",
            //maxPriorityFeePerGas: "10",
            nonce: "0",
            value: sendingEther
        }
        return txn;
    }

    useEffect(() => {
        getCurrentGasPrice()
    }, [txnIsOpen])



    return (
         <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered

        >
            <ModalOverlay
                bg='blackAlpha.300'
                backdropFilter='blur(10px) hue-rotate(90deg)'
            />
            <ModalContent
                textAlign="center"
                border="1px solid black"
            >
                <ModalBody>
                    {console.log(currentGasPrice)}
                    {recipientAddress ? 
                        <>
                        {txnIsOpen ? 
                            <Box>
                                <Box>
                                    <Flex>
                                        <Box pt="33px">
                                            <FaEthereum fontSize="30px"/>
                                        </Box>
                                        <Text fontSize="30px">{sendingEther}</Text>
                                    </Flex>
                                </Box>
                                <HStack spacing="160px">
                                    <Box>
                                        <Heading fontSize="15px">Estimated gas price</Heading>
                                        <Text color="green">{"Likely in < 30 seconds"}</Text>
                                    </Box>
                                    <Box>
                                        <Text>{currentGasPrice}</Text>
                                        <Heading fontSize="15px">{currentGasPrice}</Heading>
                                        <Heading fontSize="15px">Max Fee: {currentGasPrice}</Heading>
                                    </Box>
                                </HStack>

                                <HStack spacing="200px">
                                    <Box >
                                        <Heading fontSize="20px">Total</Heading>
                                        <Text>Amount + gas fee</Text>
                                    </Box>
                                    <Box >
                                        <Text>{parseFloat(String(parseFloat(sendingEther) + parseFloat(currentGasPrice)))}</Text>
                                    </Box>
                                </HStack>

                                <Box margin="0" pt="130px">
                                    <HStack spacing="100px">
                                        <Box border="1px solid black" width="160px" borderRadius="30px" onClick={() => {onClose(); setRecipientAddress(undefined); setSendingEther(undefined); setTxnIsOpen(false)}}>
                                            <Text>Reject</Text>
                                        </Box>
                                        <Box border="1px solid black" width="160px" borderRadius="30px" backgroundColor="lightblue" >
                                            <Text>Confirm</Text>
                                        </Box>
                                    </HStack>
                                </Box>
                            </Box>
                        :
                            <Box
                                textAlign="center"
                            >

                                <Heading pt="60px">Send</Heading>
                                <Box 
                                    mx="3%"
                                    border="1px solid black"
                                    borderRadius="10px"
                                >
                                    <Text>{recipientAddress}</Text>
                                </Box>

                                <Box>
                                    <Box 
                                        mx="20%"
                                        borderRadius="10px"
                                        border="1px solid black"
                                        textAlign="left"
                                        pl="15px"
                                    >
                                        <Flex>
                                            <Box pt="3px">
                                                <FaEthereum size="30px"/>
                                            </Box>
                                            <Box pl="3px">
                                                <Text margin="0">ETH</Text>
                                                <Text margin="0">Balance: {etherBalance}</Text>                                           
                                            </Box>                                    
                                        </Flex> 

                                    </Box>
                                    <Box
                                        mx="20%"
                                        borderRadius="10px"
                                        border="1px solid black"
                                    >
                                        <Flex>
                                            <Input placeholder="0" onChange={(e) => setSendingEther(e.target.value)}></Input>
                                            <Text>ETH</Text>
                                        </Flex> 
                                    </Box>
                                </Box>
                                <Box margin="0" pt="130px">
                                    <HStack spacing="100px">
                                        <Box border="1px solid black" width="160px" borderRadius="30px" onClick={() => {onClose(); setRecipientAddress(undefined)}}>
                                            <Text>Cancel</Text>
                                        </Box>
                                        <Box border="1px solid black" width="160px" borderRadius="30px" backgroundColor="lightblue" onClick={() => setTxnIsOpen(true)}>
                                            <Text>Next</Text>
                                        </Box>
                                    </HStack>
                                </Box>
                            </Box>
                        }
                        </>
                    :
                        <Box>
                            <Flex pt="60px">
                                <Heading pl="170px">Send to</Heading>
                                <Text 
                                    marginLeft="auto"
                                    pr="20px" pt="7px"
                                    onClick={() => onClose()}
                                >Cancel</Text>
                            </Flex>
                            <Input
                                width="90%"
                                height="30px"
                                placeholder="Search, public address (0x), or ENS"
                                onChange={(e) => checkValidEthereumAddress(e.target.value)}
                            ></Input>
                        </Box>
                    }
                </ModalBody>
            </ModalContent>
        </Modal>       
    )
}

export default TransactionModal;