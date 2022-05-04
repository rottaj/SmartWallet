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
       {console.log("Base container", "isLoadingUser: ", isLoadingUser, "isLocked: ", isLocked)}
        {isLoadingUser ?
            <Center>
                <Spinner/>
            </Center>
            :
            <>
            {Object.keys(accounts).length > 1 ?
                <>
                {isLocked == true? 
                    <LoginPage/>
                    :
                    <>
                    </>
                }
                </>
                :
                <InitializeWallet/>
            }
            </>
        }

       </> 
    )
}

export default BaseContainer;