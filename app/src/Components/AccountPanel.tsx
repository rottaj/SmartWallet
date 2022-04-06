import {
    Box,
    HStack
} from "@chakra-ui/react"


const AccountPanel = () => {
    return (
        <Box
            px="5px"
            pt="50px"
            pb="10px"
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
        </Box>
    )
}

export default AccountPanel;