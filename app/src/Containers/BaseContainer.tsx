import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { WalletContext } from "../contexts";
import InitializeWallet from './InitializeWallet';
import LoginPage from './LoginPage';
import { 
    Spinner,
    Center
} from '@chakra-ui/react'
const BaseContainer = () => {

    const { chrome, isLocked, accounts, isLoadingUser }: any = useContext(WalletContext);
    

    return (
       <>
       {console.log("Base container", "isLoadingUser: ", isLoadingUser, "isLocked: ", isLocked, "Accounts: ", Object.keys(accounts).length)}
        {isLoadingUser ?
            <Box minH="100vh" h="100%" bgColor="black" textAlign="center" pt="40px" position="absolute">
                <Center>
                    <Spinner size="xl"/>
                </Center>
            </Box>
            :
            <>
            {isLocked == true && Object.keys(accounts).length == 0 &&
                <InitializeWallet/>
            }
            {isLocked == true && Object.keys(accounts).length != 0 &&
                <LoginPage/>
            }
            </>
        }

       </> 
    )
}

export default BaseContainer;