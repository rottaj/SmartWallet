import { ethers } from 'ethers';
import { useState, useContext } from 'react';
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
import { WalletContext } from '../../contexts';

type AccountModalProps = {
    isOpen: any;
    onOpen: any;
    onClose: any;
}

const AccountModal = ({isOpen, onOpen, onClose} : AccountModalProps) => {
    
    const [ isCreating, setIsCreating ]: any = useState(false);
    const { chrome, account, setAccount }: any = useContext(WalletContext)

    const createNewAccount = async (e: any) => {
        e.preventDefault();
        console.log("TESTING TARGET", e)
        const newWallet = ethers.Wallet.createRandom();
        const account = new ethers.Wallet(newWallet.privateKey);
        console.log(newWallet, account)
        //onClose()
        chrome.storage.sync.set({[`${e.target[0].value}`]: account}, function() {
            console.log("ACCOUNT CREATED", e.target[0].value, account)
        })
        chrome.storage.sync.get(e.target[0].value, function(res: any) {
            console.log("GET ACCOUNT", res.privateKey)
        })
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

                            <form
                                onSubmit={createNewAccount}
                            >
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
                                <Button
                                    borderRadius="20px"
                                    width="160px"
                                    backgroundColor="lightblue"
                                    type="submit"
                                    
                                >
                                    <Text>Create</Text>
                                </Button>
                            </HStack>
                            </form>
                        </Box>

                    }
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default AccountModal;