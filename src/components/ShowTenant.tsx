import { Box, Card, Flex, Grid, Text } from "@chakra-ui/react"
import useTenant from "../hooks/useTenant"

interface Props {
    tenantId: string
}

const ShowTenant = ({tenantId} : Props) => {

    const { tenant } = useTenant(tenantId)

    console.log(`tenantId is coming like a prop: ${tenantId}`);
    

    return (
        <>
            <Card width='100%'>
                <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                    <Box>
                        <Flex>
                            <Text>Name:</Text>
                            <Text>{tenant.tenantName}</Text>
                        </Flex>
                        <Flex>
                            <Text>Phone 1:</Text>
                            <Text>{tenant.phone}</Text>
                        </Flex>
                        <Flex>
                            <Text>Phone 2:</Text>
                            <Text>{tenant.AnotherPhone}</Text>
                        </Flex>
                        <Flex>
                            <Text>Rent:</Text>
                            <Text>{tenant.rentDecided}</Text>
                        </Flex>
                    </Box>

                </Grid>
            </Card>
        </>
    )
}

export default ShowTenant