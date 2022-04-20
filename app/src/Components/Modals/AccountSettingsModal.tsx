import { ethers } from 'ethers';
import { useState, useContext, useEffect } from 'react';
import {
    Box,
    Flex,
    Heading,
    Input,
    HStack,
    Text,
    Button,
    Modal,
    ModalBody,
    ModalOverlay,
    ModalContent
} from "@chakra-ui/react";
import { AiFillCloseCircle } from 'react-icons/ai';
import { WalletContext } from '../../contexts';
import { getUserEthereumBalance } from "../../utils/HandleUserTokens";

type AccountModalProps = {
    isOpen: any;
    onOpen: any;
    onClose: any;
}

const AccountSettingsModal = ({isOpen, onOpen, onClose} : AccountModalProps) => {
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
                    <Box py="10px">
                        <Box textAlign="right" onClick={() => onClose()} px="10px" pt="10px">
                            <AiFillCloseCircle size="40px"/>
                        </Box>
                        <Box border="1px solid black" >
                            <Text>View Private Key</Text>
                        </Box> 
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default AccountSettingsModal;