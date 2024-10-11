import { Box, Card, CardBody, Flex, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react"


const TenantSkeleton = () => {
    return (
        <>

            <Card overflow='hidden'>
                <Flex>

                    <Skeleton height={16} />

                    <CardBody
                        px={5}
                        gap={2}
                        display='flex'
                        alignItems='center'
                        justifyContent='space-between'>

                        <SkeletonText
                            ml={2}
                            w='70%'
                            noOfLines={1}
                            borderRadius={10}
                            skeletonHeight={{ base: 5, sm: 5, lg: 6 }} />

                        <Box
                            gap={2}
                            display='flex'
                            alignItems='center'
                            justifyContent='center'>

                            <SkeletonCircle
                                w={{ base: 3, sm: 4, lg: 5 }}
                                h={{ base: 3, sm: 4, lg: 5 }} 
                                borderRadius={{ base: 2, sm: 2, lg: 5 }}
                                />
                            <SkeletonCircle
                                w={{ base: 3, sm: 4, lg: 5 }}
                                h={{ base: 3, sm: 4, lg: 5 }} 
                                borderRadius={{ base: 2, sm: 2, lg: 5 }}
                                />
                            <SkeletonCircle
                                w={{ base: 3, sm: 4, lg: 5 }}
                                h={{ base: 3, sm: 4, lg: 5 }} 
                                borderRadius={{ base: 2, sm: 2, lg: 5 }}
                                />
                           
                        </Box>

                        <SkeletonCircle
                            w={1}
                            top={0}
                            h='100%'
                            left={0}
                            borderRadius={0}
                            position='absolute' />

                    </CardBody>

                </Flex>

            </Card>

        </>
    )
}

export default TenantSkeleton