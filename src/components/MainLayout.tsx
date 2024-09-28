import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import { Box } from "@chakra-ui/react"


const MainLayout = () => {
    return (
        <>
            <Box>

            <header>
                <Navbar />
            </header>

            <main>
                <Outlet />
            </main>

            </Box>
        </>
    )
}

export default MainLayout