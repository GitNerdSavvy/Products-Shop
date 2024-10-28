import {Box} from "@chakra-ui/react"
import {Route,Routes} from 'react-router-dom'
import Create from "../Pages/Create"
import Home from "../Pages/Home"
import Navbar from "../Components/Navbar"
import { useColorModeValue } from "@chakra-ui/react"
function App() {

  return (
    <>
     <Box minH={"100vh"} bg={useColorModeValue("gray.100","gray.900")}>
      {<Navbar/>}
      <Routes>
    <Route path ='/' element={<Home/>}/>
    <Route path ='/create' element={<Create/>}/>


      </Routes>


     </Box>
    </>
  )
}

export default App
