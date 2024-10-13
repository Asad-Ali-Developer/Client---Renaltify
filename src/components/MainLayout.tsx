import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import { Box, useColorModeValue } from "@chakra-ui/react"


const MainLayout = () => {
    return (
        <Box bg={useColorModeValue('#f2f3f6', '')}>
            <Box>

            <header>
                <Navbar />
            </header>

            <main>
                <Outlet />
            </main>

            </Box>
        </Box>
    )
}

export default MainLayout