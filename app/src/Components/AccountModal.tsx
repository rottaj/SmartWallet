import { ethers } from 'ethers';
import * as crypto from 'crypto';
import { useState } from 'react';
import {
    Box,
    Heading,
    Input,
    HStack,
    Button,
    Modal,
    ModalBody,
    ModalOverlay,
    ModalContent
} from "@chakra-ui/react";

type AccountModalProps = {
    isOpen: any;
    onOpen: any;
    onClose: any;
}

const AccountModal = ({isOpen, onOpen, onClose} : AccountModalProps) => {
    
    const [ isCreating, setIsCreating ]: any = useState(false);

    const createNewAccount = async () => {
        const newWallet = ethers.Wallet.createRandom();
        const wallet = new ethers.Wallet(newWallet.privateKey);
        console.log(newWallet, wallet)
        onClose()
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
                    {!isCreating ? 
                        <Box>
                            <Box
                                border="1px solid black"
                                borderRadius="20px"
                                onClick={() => setIsCreating(true)}
                            >
                                <Heading> + Create Account</Heading> 
                            </Box>
                        </Box> 
                        :
                        <Box>
                            <Heading>Account Name</Heading>
                            <Input placeholder="Account 1"></Input> 
                            <HStack>
                                <Button 
                                    borderRadius="20px"
                                    size="lg"
                                    onClick={() => setIsCreating(false)}
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    borderRadius="20px"
                                    size="lg"
                                    onClick={() => createNewAccount()}
                                >
                                    Create
                                </Button>
                            </HStack>

                        </Box>
                    }
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default AccountModal;