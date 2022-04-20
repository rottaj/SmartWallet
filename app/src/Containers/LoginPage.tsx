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

const LoginPage = () => {

    const { chrome, isLoggedIn, setIsLoggedIn }: any  = useContext(WalletContext);

    const [ show, setShow ] = useState(false);

    const handleLogin = (password: any) => {
        chrome.storage.sync.get("passwordhash", function(res: any) {
            //if ()
        })
    }

    const handleClick = () => setShow(!show);

    return (
        <Box minH="100vh" h="100%" bgColor="#141114" textAlign="center" pt="40px">
            <Heading color="white" fontSize="30px">Login to Smart Wallet</Heading>
            <form onSubmit={handleLogin}>
            <InputGroup size='md'>
                <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Enter password'
            />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                </Button>
                </InputRightElement>
            </InputGroup>
            </form>
        </Box>
    )
}

export default LoginPage;