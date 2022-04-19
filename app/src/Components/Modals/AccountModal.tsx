import { ethers } from 'ethers';
import { useState } from 'react';
import {
    Box,
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
                            <Box textAlign="right" onClick={() => onClose()} px="10px" pt="10px">
                                <AiFillCloseCircle size="40px"/>
                            </Box>
                            <Box
                                border="1px solid black"
                                borderRadius="20px"
                                onClick={() => setIsCreating(true)}
                            >
                                <Heading> + Create Account</Heading> 
                            </Box>
                        </Box> 
                        :
                        <Box py="10px">
                            <Heading>Account Name</Heading>
                            <Input placeholder="Account 1" py="5px" px="5px"></Input> 
                            <HStack spacing="100px" pt="15px">
                                <Box
                                    borderRadius="30px"
                                    border="1px solid black"
                                    width="160px"
                                    onClick={() => setIsCreating(false)}
                                >
                                    <Text>Cancel</Text>
                                </Box>
                                <Box
                                    borderRadius="20px"
                                    width="160px"
                                    backgroundColor="lightblue"
                                    onClick={() => createNewAccount()}
                                >
                                    <Text>Create</Text>
                                </Box>
                            </HStack>
                        </Box>

                    }
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default AccountModal;