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
import { generateQRCode} from "../../utils/GenerateQrCode";

type AccountModalProps = {
    isOpen: any;
    onOpen: any;
    onClose: any;
}

const AccountSettingsModal = ({isOpen, onOpen, onClose} : AccountModalProps) => {

    const { currentAccount, accounts }: any = useContext(WalletContext);
    const [ isViewingKey, setIsViewingKey ]: any = useState(false);

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

                    {isViewingKey ?
                        <Box>
                            <Box textAlign="right" onClick={() => setIsViewingKey(false)} px="10px" pt="10px">
                                <AiFillCloseCircle size="40px"/>
                            </Box>                               
                            <Box>
                                {accounts[currentAccount]._privateKey}
                            </Box>
                        </Box>
                        : // Refactor when adding more options
                        <Box py="10px">
                            <Box textAlign="right" onClick={() => onClose()} px="10px" pt="10px">
                                <AiFillCloseCircle size="40px"/>
                            </Box>
                            <Box border="1px solid black" onClick={() => setIsViewingKey(true)}>
                                <Text>View Private Key</Text>
                            </Box> 
                        </Box>
                    }
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default AccountSettingsModal;