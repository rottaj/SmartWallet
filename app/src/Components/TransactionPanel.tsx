import { useContext } from 'react';
import {
    Box,
    HStack,
    Heading,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import { FiSend } from 'react-icons/fi';
import TransactionModal from './Modals/TransactionModal';

const TransactionPanel = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Box>
            <TransactionModal isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
            <HStack>
                <Box 
                    backgroundColor="lightblue"
                    borderRadius="180px"
                    width="80px"
                    height="80px"
                    justifyContent="center"
                >
                    <Box pt="20px" onClick={onOpen}>
                        <FiSend size="40px"/>
                    </Box>
                    <Text>Send</Text>
                </Box>
                <Box>

                </Box>
            </HStack>
        </Box>
    )
}

export default TransactionPanel;