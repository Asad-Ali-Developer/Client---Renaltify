import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import { Box, useColorModeValue } from "@chakra-ui/react"


const MainLayout = () => {
    return (
        <Box >
            <Box>

                <header>
                    <Navbar />
                </header>

                <main>
                    <Box
                        h='93vh'
                        bg={useColorModeValue('#f2f3f6', '')}>
                        <Outlet />
                    </Box>
                </main>

            </Box>
        </Box>
    )
}

export default MainLayout