import { Card, Skeleton, SkeletonText } from "@chakra-ui/react"

const TenantDetailSketelton = () => {
    return (
        <>

            <Card borderRadius={7}>
                <Skeleton height={4} />
                <SkeletonText noOfLines={1} height={2} w={40} />
            </Card>

        </>
    )
}

export default TenantDetailSketelton