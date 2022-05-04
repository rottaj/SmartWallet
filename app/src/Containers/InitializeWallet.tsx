import { useEffect, useContext } from 'react'
import { ethers } from 'ethers';
import {
    Box,
    Heading,
    Input,
    Button
} from "@chakra-ui/react"
import { WalletContext } from '../contexts';
import sha256 from 'crypto-js/sha256';
import { storeCurrentAccount } from '../utils/chrome/StoreCurrentAccount';
import { storeIsLocked } from '../utils/chrome/StoreIsLocked';

const alchemy_url: any = process.env.REACT_APP_ALCHEMY_RPC;
const priv_key: any = process.env.REACT_APP_PRIV_KEY;



const InitializeWallet = () => {

    const { chrome, setIsLocked, provider }: any = useContext(WalletContext)

    useEffect(() => {

    }, [])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(e)
        const passwordHash = sha256(e.target[0].value);
        console.log("INIT HAHS", passwordHash.toString());
        chrome.storage.sync.set({"passwordHash": passwordHash.toString()});

        const newWallet = ethers.Wallet.createRandom();
        const wallet: any = new ethers.Wallet(newWallet.privateKey, provider);
        wallet['_privateKey'] = newWallet.privateKey;
        chrome.storage.sync.set({"Account 1": wallet}, function() {
            console.log("ACCOUNT CREATED", 'Account 1', Object.getOwnPropertyNames(wallet));
        })

        storeCurrentAccount("Account 1");
        storeIsLocked(false);
        setIsLocked(false);
        
    }

    return (
         <Box minH="100vh" h="100%" bgColor="#141114" textAlign="center" pt="40px" position="absolute">
            <Heading color="white" fontSize="30px">Create a new Smart Wallet</Heading>
            <form onSubmit={handleSubmit}>
                <Input placeholder="Choose a Password" px="100px" py="15px" type="password"></Input>
                <Input pt="15px" placeholder="Re-Type Password" px="100px" py="15px" type="password"></Input>
                <Button
                bgColor="#06d6a0"
                _hover={{ bgColor: "#95d5b2" }}
                color="black"
                mt="22px"
                p="8"
                type="submit"
                >
                    Create Wallet
                </Button>
            </form>
        </Box>       
    )
}

export default InitializeWallet;