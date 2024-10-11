import { Card, CardBody, Skeleton } from "@chakra-ui/react"

const ImageSkeleton = () => {
    return (
        <>
            <Card overflow='hidden'>

                <CardBody overflow='hidden'>
                    <Skeleton
                    borderRadius='md'
                    height={{ base: 170, md: 200, lg: 200 }}
                    width={{ base: '290px', md: '350px', lg: '350px' }}
                    />
                </CardBody>
            </Card>
        </>
    )
}

export default ImageSkeleton