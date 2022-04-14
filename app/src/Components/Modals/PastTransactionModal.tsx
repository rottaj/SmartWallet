import { ethers } from 'ethers';
import { useState, useEffect, useContext } from 'react';
import {
    Box,
    Flex,
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
import { AccountContext } from '../../contexts';
import { FaEthereum } from 'react-icons/fa';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';

type PastTransactionModalProps = {
    txn: any;
    isOpen: any;
    onOpen: any;
    onClose: any;
}


const PastTransactionModal = ({txn, isOpen, onOpen, onClose}: PastTransactionModalProps) => {
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
                                <Text color="blue" fontSize="14px">View on block explorer</Text>
                                <Text color="blue" fontSize="14px">Copy Transaction ID</Text>
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