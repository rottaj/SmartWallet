import { ethers } from 'ethers';
import { useState, useContext } from 'react';
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

type TransactionModalProps = {
    isOpen: any;
    onOpen: any;
    onClose: any;
}

const TransactionModal = ({isOpen, onOpen, onClose}: TransactionModalProps) => {

    const [ recipientAddress, setRecipientAddress ]: any = useState()
    const { etherBalance }: any = useContext(AccountContext);

    const checkValidEthereumAddress = (address: string) => {
        try {
            if (ethers.utils.getAddress(address)) {
                setRecipientAddress(address)
            } 
        } catch(error) {} 
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
                    {recipientAddress ? 
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
                                    <Text margin="0">ETH</Text>
                                    <Text margin="0">Balance: {etherBalance}</Text>
                                </Box>
                                <Box
                                    mx="20%"
                                    borderRadius="10px"
                                    border="1px solid black"
                                >
                                    <Input placeholder="0"></Input>
                                </Box>
                            </Box>
                        </Box>
                    :
                        <Box>
                            <Flex pt="60px">
                                <Heading pl="170px">Send to</Heading>
                                <Text 
                                    marginLeft="auto"
                                    pr="20px" pt="7px"
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