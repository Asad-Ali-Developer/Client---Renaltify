import { Box, Input, Text } from "@chakra-ui/react";

<Box mb={4}>
    <Text
        fontSize={{ base: 'sm', md: 'md' }}>
        Police Chalan
    </Text>
    <Input
        // {...register('PoliceChalan')}
        type="file"
        variant="filled"
        id="policeChalanId"
        name="policeChalan"
        // onChange={handleFileInput}
        // value={tenant.PoliceChalan}
        className="FileInputStyling"
    />
    {/* <Text color="red.500">{errors.PoliceChalan?.message}</Text> */}
</Box>


{/* <Box mb={4}>
                                        <Text
                                            fontSize={{ base: 'sm', md: 'md' }}>
                                            Tenant Picture
                                        </Text>
                                        <Input
                                            // {...register('TenantPhotoLink')}
                                            type="file"
                                            id="tenantPhoto"
                                            variant='filled'
                                            onChange={handleFileInput}
                                            name="tenantPhoto"
                                            className="FileInputStyling"
                                            value={tenant.TenantPhotoLink}
                                        />
                                        <Text color="red.500">{errors.TenantPhotoLink?.message}</Text>
                                    </Box> */}