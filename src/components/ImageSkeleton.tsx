import { Card, Skeleton } from "@chakra-ui/react"

const ImageSkeleton = () => {
    return (
        <>
            <Card>

                <Skeleton height={40} width='100%' borderRadius='md' />

            </Card>
        </>
    )
}

export default ImageSkeleton