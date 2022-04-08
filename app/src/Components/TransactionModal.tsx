import { ethers } from 'ethers';
import * as crypto from 'crypto';
import { useState } from 'react';
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

type TransactionModalProps = {
    isOpen: any;
    onOpen: any;
    onClose: any;
}

const TransactionModal = ({isOpen, onOpen, onClose}: TransactionModalProps) => {
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
                        ></Input>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>       
    )
}

export default TransactionModal;