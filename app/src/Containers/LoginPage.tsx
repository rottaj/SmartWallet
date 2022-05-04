import { useContext, useState } from 'react';
import {
    Box,
    Flex,
    Button,
    Input,
    InputGroup,
    InputRightElement,
    Heading
} from '@chakra-ui/react';
import { WalletContext } from '../contexts';
import { storeIsLocked } from '../utils/chrome/StoreIsLocked';

const LoginPage = () => {

    const { chrome, isLoggedIn, setIsLoggedIn }: any  = useContext(WalletContext);

    const [ show, setShow ] = useState(false);

    const handleLogin = (e: any) => {
        e.preventDefault();
        chrome.storage.sync.get("passwordhash", function(res: any) {
            console.log("RRES", res, e.target[0].value);
            if (res == e.target[0].value) {
                console.log("FOOOOOOOOOOOOOOOOOBAR")
                storeIsLocked(false);
                setIsLoggedIn(true);
            }
        })

    }

    const handleClick = () => setShow(!show);

    return (
        <Box minH="100vh" h="100%" bgColor="black" textAlign="center" pt="40px">
            <Heading color="white" fontSize="30px">Login to Smart Wallet</Heading>
            <form onSubmit={handleLogin}>
            <InputGroup size='md' color="white">
                <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Enter password'
            />
                <InputRightElement width='4.5rem'>
                    <Button color="white" h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                </Button>
                </InputRightElement>
            </InputGroup>
            <Button type="submit" color="white">
                Login
            </Button>
            </form>
        </Box>
    )
}

export default LoginPage;