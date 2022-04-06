import {
  Box,
  Heading
} from "@chakra-ui/react";
import TopHeading from "./Components/TopHeading";
import AccountPanel from "./Components/AccountPanel";

const App = () => {
  return (
    <Box
      height="800px"
      width="400px"
      textAlign="center"
    >
      <TopHeading/>
      <AccountPanel/>
    </Box>
  );
}

export default App;
