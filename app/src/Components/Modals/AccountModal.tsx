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
import { AiFillCloseCircle, AiFillLock } from 'react-icons/ai';
import { WalletContext } from '../../contexts';
import { getEthereumBalance } from "../../utils/HandleUserTokens";

type AccountModalProps = {
    isOpen: any;
    onOpen: any;
    onClose: any;
}

const AccountModal = ({isOpen, onOpen, onClose} : AccountModalProps) => {
    
    const [ isCreating, setIsCreating ]: any = useState(false);
    const { 
        chrome, 
        provider, 
        setWallet, 
        accounts, 
        currentAccount,
        setCurrentAccount, 
        setEtherBalance, 
        setIsLocked 
    }: any = useContext(WalletContext)



    const createNewAccount = async (e: any) => {
        e.preventDefault();
        const newWallet = ethers.Wallet.createRandom();
        const account: any = new ethers.Wallet(newWallet.privateKey, provider);
        account['_privateKey'] = newWallet.privateKey
        //onClose()
        chrome.storage.sync.set({[`${e.target[0].value}`]: account}, function() {
            console.log("ACCOUNT CREATED", e.target[0].value, account, Object.getOwnPropertyNames(account))
        })
        chrome.storage.sync.get(e.target[0].value, function(res: any) {
            console.log("GET ACCOUNT", res._privateKey)
        })
    }

    const handleAccountChange = async (account: any) => {
        console.log("TESTING CHANGE", accounts[account]._privateKey)
        setCurrentAccount(account);
        const wallet = new ethers.Wallet(accounts[account]._privateKey, provider);
        console.log("TESTING WALLET CHANGE", wallet)
        const balance = await getEthereumBalance(accounts[account].address)
        setWallet(wallet)
        setEtherBalance(balance)

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
                    {/*console.log("PRIVATE KEY", accounts[currentAccount]._privateKey)*/}
                    {currentAccount &&
                        <>
                        {console.log("CURRENT ACCOUNT", currentAccount, "KEYS", Object.getOwnPropertyNames(accounts[currentAccount]))}
                        </>
                    }
                    {!isCreating ? 
                        <Box>
                            <HStack spacing="200px">
                                <Flex>
                                    <Box onClick={() => { setIsLocked(true); console.log("CLICKED")} }>
                                        <Text fontSize="15px">Lock</Text>
                                    </Box>
                                    <Box>
                                        <AiFillLock/>
                                    </Box>
                                </Flex>

                                <Box textAlign="right" onClick={() => onClose()} px="10px" pt="10px">
                                    <AiFillCloseCircle size="40px"/>
                                </Box>
                            </HStack>

                            <Box mx="5px">
                                {Object.keys(accounts).map((account, item: any) => {
                                    return (
                                        <Box
                                            border="1px solid black"
                                            py="3px"
                                            my="3px"
                                            onClick={() => {handleAccountChange(account); onClose()}}
                                         >
                                            <Text fontSize="20px">{account}</Text>

                                        </Box>
                                    )
                                })}
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