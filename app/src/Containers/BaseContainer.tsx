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
            <Center>
                <Spinner/>
            </Center>
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