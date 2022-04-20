import { useContext } from 'react';
import { WalletContext } from "../contexts";
import LoginPage from './LoginPage';

const BaseContainer = () => {

    const { isLoggedIn }: any = useContext(WalletContext);

    return (
       <>
        {console.log("TESTTTTT", isLoggedIn)}
        {isLoggedIn == false ? 
            <LoginPage/>
            :
            <>
            </>
        }
       </> 
    )
}

export default BaseContainer;