import { useEffect } from 'react';
import { useContext } from 'react';
import { WalletContext } from "../contexts";
import InitializeWallet from './InitializeWallet';
import LoginPage from './LoginPage';

const BaseContainer = () => {

    const { chrome, isLocked, accounts }: any = useContext(WalletContext);
    

    return (
       <>
        {console.log("TESTTTTT", isLocked)}
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
    )
}

export default BaseContainer;