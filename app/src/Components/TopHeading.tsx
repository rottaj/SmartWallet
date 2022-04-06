import {
    Box,
    HStack,
    Heading,
    Image,

    useDisclosure,
} from "@chakra-ui/react";
import tempImage from "../images/my_fucking_mayc.png";
import AccountModal from './AccountModal';

const TopHeading = () => {

    const {isOpen, onClose, onOpen } = useDisclosure();

    return (
        <Box 
            backgroundColor="light grey"
            height="50px"
            pt="2%"
        >

            <AccountModal isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
            <HStack
                spacing="100px"
            >
                <Box
                    pl="5px"
                >
                    Logo
                </Box>
                <Box>
                    <Heading
                        alignSelf="center"
                    >Ethereum Main Net
                    </Heading>
                </Box>

                <Box
                    pr="5px"
                    onClick={onOpen}
                >
                    <Image 
                        src={tempImage}
                        height="50px"
                        width="50px"
                        borderRadius="180px"
                        border="1px solid black"
                    ></Image>        
                </Box>
            </HStack>
        </Box>
    )
}

export default TopHeading;

