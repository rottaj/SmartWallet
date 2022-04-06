import {
    Box,
    HStack,
    Text,
    Heading
} from "@chakra-ui/react"


const AccountPanel = () => {


    return (
        <Box
            mx="5px"
            mt="50px"
            mb="10px"
            borderBottom="2px solid black"
        >
            <HStack
                spacing="100px"
            >
                <Box>
                    Connected
                </Box>
                <Box>
                    Account 6
                </Box>
                <Box>
                    Options
                </Box>
            </HStack>
            <Box
                my="2px"
                mx="2px"
                width="100%"
                borderRadius="10px"
                border="1px solid black"
                textAlign="left"
            >
                <Text py="5px" px="10px" margin="0" fontSize="12px">Net Worth</Text>
                <Box padding="0" margin="0" px="5px" pb="10px">
                    <Heading margin="0" fontSize="35px">$100,101.52</Heading> 
                    <Text margin="0" fontSize="10px" color="green" px="5px">+0.53% ($580.90)</Text>
                </Box>

            </Box>
            <HStack margin="0" spacing="100px" pb="5px">
                <Box>
                    <Text fontSize="10px">Tokens Worth</Text>
                    <Box margin="0">
                        <Text margin="0" fontSize="13px">25,532.21</Text>
                        <Text pl="2px" pt="1px" margin="0" fontSize="10px" color="red">-0.31% ($321.12)</Text>
                    </Box>
                </Box>
                <Box>
                    <Text fontSize="10px">DeFi Worth</Text>
                        <Text margin="0" fontSize="13px">-</Text>
                </Box>
                <Box>
                    <Text fontSize="10px">NFT's Worth</Text>
                        <Text margin="0" fontSize="13px">84,133.84</Text>
                        <Text margin="0" fontSize="10px" color="green" px="5px">+2.80% ($2,580.90)</Text>
                </Box>
            </HStack>
        </Box>
    )
}

export default AccountPanel;