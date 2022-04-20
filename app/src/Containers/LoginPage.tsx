import { useContext } from 'react';
import {
    Box,
    Flex,
    Button,
    Input,
    Heading
} from '@chakra-ui/react';
import { WalletContext } from '../contexts';

const LoginPage = () => {

    const { isLoggedIn, setIsLoggedIn }: any  = useContext(WalletContext);

    return (
        <Box minH="100vh" h="100%" bgColor="#141114" textAlign="center">
            <Heading color="white">Login to Smart Wallet</Heading>
            <Input px="100px" py="15px"></Input>
            <Button
              bgColor="#06d6a0"
              _hover={{ bgColor: "#95d5b2" }}
              color="black"
              mt="22px"
              p="8"
            >
                Login
            </Button>
        </Box>
    )
}

export default LoginPage;