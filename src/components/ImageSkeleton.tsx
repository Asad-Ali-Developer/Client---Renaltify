import { Card, CardBody, Skeleton } from "@chakra-ui/react"

const ImageSkeleton = () => {
    return (
        <>
            <Card overflow='hidden'>

                <CardBody>
                    <Skeleton
                        borderRadius='md'
                        height={{ base: 170, md: 200, lg: 200 }}
                        width={{ base: '200px', md: '350px', lg: '350px' }}
                    />
                </CardBody>
            </Card>
        </>
    )
}

export default ImageSkeleton