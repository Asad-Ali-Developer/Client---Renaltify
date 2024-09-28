import { IconButton, useColorMode } from "@chakra-ui/react"
import { FaMoon, FaSun } from "react-icons/fa"


const CustomSwitch = () => {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <>

            <IconButton
                aria-label="Toggle color mode"
                icon={colorMode === 'dark' ? <FaSun /> : <FaMoon />}
                onClick={toggleColorMode}
                variant="ghost"
                color="current"
                _hover={colorMode === 'dark' ? { bg: 'gray.800' } : { bg: 'gray.100' }}
            />

        </>
    )
}

export default CustomSwitch