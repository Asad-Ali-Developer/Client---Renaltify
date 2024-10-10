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
                            borderRadius={10}
                            mt={{ base: 3, sm: 3, lg: 0 }}
                            noOfLines={{ base: 2, sm: 2, lg: 1 }}
                            skeletonHeight={{ base: 3, sm: 3, lg: 6 }} />

                        <Box
                            gap={2}
                            display='flex'
                            alignItems='center'
                            justifyContent='center'>

                            <SkeletonCircle
                                borderRadius={5}
                                w={{ base: 3, sm: 4, lg: 5 }}
                                h={{ base: 3, sm: 4, lg: 5 }} />
                            <SkeletonCircle
                                borderRadius={5}
                                w={{ base: 3, sm: 4, lg: 5 }}
                                h={{ base: 3, sm: 4, lg: 5 }} />
                            <SkeletonCircle
                                borderRadius={5}
                                w={{ base: 3, sm: 4, lg: 5 }}
                                h={{ base: 3, sm: 4, lg: 5 }} />
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