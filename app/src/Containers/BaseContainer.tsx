import { useEffect } from 'react';
import { useContext } from 'react';
import { WalletContext } from "../contexts";
import InitializeWallet from './InitializeWallet';
import LoginPage from './LoginPage';

const BaseContainer = () => {

    const { chrome, isLoggedIn, isLocked, accounts }: any = useContext(WalletContext);
    

    return (
       <>
        {console.log("TESTTTTT", isLoggedIn, isLocked)}
        {Object.keys(accounts).length > 1 ?
            <>
            {isLoggedIn == false && isLocked != true? 
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