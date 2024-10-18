import { Box, Card, CardBody, Flex, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react"


const TenantSkeleton = () => {
    return (
        <>

            <Card overflow='hidden'>
                <Flex>

                    <Skeleton height={{base: 14, md: 16}} />

                    <CardBody
                        px={5}
                        gap={2}
                        display='flex'
                        alignItems='center'
                        justifyContent='space-between'>

                        <SkeletonText
                            ml={2}
                            borderRadius={14}
                            noOfLines={{ base: 2, sm: 1 }}
                            skeletonHeight={{ base: 3,md: 5, lg: 6 }}
                            w={{ base: '50%', sm: '60%', lg: '70%' }} />

                        <Box
                            gap={3}
                            display='flex'
                            alignItems='center'
                            justifyContent='center'>

                            <SkeletonCircle
                                w={{ base: 3.5, sm: 4, lg: 5 }}
                                h={{ base: 3.5, sm: 4, lg: 5 }}
                                borderRadius={{ base: 2, sm: 2, lg: 5 }}
                            />
                            <SkeletonCircle
                                w={{ base: 3.5, sm: 4, lg: 5 }}
                                h={{ base: 3.5, sm: 4, lg: 5 }}
                                borderRadius={{ base: 2, sm: 2, lg: 5 }}
                            />
                            <SkeletonCircle
                                w={{ base: 3.5, sm: 4, lg: 5 }}
                                h={{ base: 3.5, sm: 4, lg: 5 }}
                                borderRadius={{ base: 2, sm: 2, lg: 5 }}
                            />

                        </Box>

                        <SkeletonCircle
                            top={0}
                            h='100%'
                            left={0}
                            borderRadius={0}
                            position='absolute'
                            w={{ base: 1, md: 1.5 }} />

                    </CardBody>

                </Flex>

            </Card>

        </>
    )
}

export default TenantSkeleton