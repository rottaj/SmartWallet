import { useEffect } from 'react';
import { useContext } from 'react';
import { WalletContext } from "../contexts";
import InitializeWallet from './InitializeWallet';
import LoginPage from './LoginPage';

const BaseContainer = () => {

    const { chrome, isLoggedIn, isConnected }: any = useContext(WalletContext);
    

    return (
       <>
        {console.log("TESTTTTT", isLoggedIn)}
        {isConnected ?
            <>
            {isLoggedIn == false && isConnected == false? 
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
    )
}

export default BaseContainer;