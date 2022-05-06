import { ethers } from 'ethers';
import { useState, useEffect, useContext } from 'react';
import {
    Box,
    Flex,
    Link,
    Text,
    Heading,
    HStack,
    Table,
    Tbody,
    Tr,
    Th,
    Td,
    Modal,
    ModalBody,
    ModalOverlay,
    ModalContent
} from "@chakra-ui/react";
import { WalletContext } from '../../contexts';
import { FaEthereum } from 'react-icons/fa';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import { textSpanContainsPosition } from 'typescript';

type PastTransactionModalProps = {
    txn: any;
    isOpen: any;
    onOpen: any;
    onClose: any;
}
const ETHERSCAN_URL = 'https://rinkeby.etherscan.io/tx/'

const PastTransactionModal = ({txn, isOpen, onOpen, onClose}: PastTransactionModalProps) => {

    const [ isCopied, setIsCopied ]: any = useState(false);

    const handleRedirect = () => {
        window.open(ETHERSCAN_URL + txn.hash)
    }

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
                    {console.log("TXN", txn)}
                    <Box px="10px">
                        <HStack spacing="300px">
                            <Box>
                                <Heading>Send</Heading>
                            </Box>
                            <Box onClick={() => onClose()}>
                                <AiFillCloseCircle size="40px"/>
                            </Box>
                        </HStack>
                    </Box>
                    <Box px="10px" pt="30px">
                        <HStack spacing="180px">
                            <Box>
                                <Heading fontSize="18px">Status</Heading>
                                {txn.isError == "0" ?
                                    <Text color="green" fontSize="15px">Success</Text>
                                :
                                    <Text color="Red">Failed</Text>
                                }
                            </Box>
                            <Box>
                                <Link color="blue" fontSize="14px" onClick={() => handleRedirect}>View on block explorer</Link>
                                <Link color="blue" fontSize="14px" onClick={() => {navigator.clipboard.writeText(txn.hash); setIsCopied(true)}} >Copy Transaction ID</Link>
                            </Box>
                        </HStack>
                    </Box>
                    <Box pt="20px">
                        <HStack spacing="90px">
                            <Box>
                                <Heading>From</Heading>
                                <Text>{txn.from.substr(0,9)}...</Text>
                            </Box>
                            <Box>
                                <BsFillArrowRightCircleFill size="30px"/>
                            </Box>
                            <Box>
                                <Heading>To</Heading>
                                <Text>{txn.to.substr(0,9)}...</Text>
                            </Box>
                        </HStack>
                    </Box>
                    <Box pl="40px" pt="15px">
                        <Table>
                            <Tbody>
                            <Tr>
                                <Td>Nonce</Td>
                                <Td textAlign="right">{txn.nonce}</Td>
                            </Tr>
                            <Tr>
                                <Td>Amount</Td>
                                <Td textAlign="right">{ethers.utils.formatEther(txn.value)}</Td>
                            </Tr>
                            <Tr>
                                <Td>Gas Limit</Td>
                                <Td textAlign="right">{txn.gas}</Td>
                            </Tr>
                            <Tr>
                                <Td>Gas Used</Td>
                                <Td textAlign="right">{txn.gasUsed}</Td>
                            </Tr>
                            <Tr>
                                <Td>Total gas Fee</Td>
                                <Td textAlign="right">{ethers.utils.formatEther(txn.gasPrice)}</Td>
                            </Tr>
                            <Tr>
                                <Td pt="30px">Total</Td>
                                <Td pt="30px" textAlign="right">{parseFloat(String(parseFloat(String(ethers.utils.formatEther(txn.value))) + parseFloat(String(ethers.utils.formatEther(txn.gasPrice)))))}</Td>
                            </Tr>
                            </Tbody>
                        </Table>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>              
    )
}

export default PastTransactionModal;