import { Box, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { FiEdit } from "react-icons/fi"
import useTenantStatusUpdater from "../hooks/useTenantStatusUpdator"
import { toast } from "react-toastify"

interface Props {
    tenantId: string | undefined
}


const StatusUpdater = ({ tenantId }: Props) => {

    const { mutate } = useTenantStatusUpdater();

    const toggleStatus = async (newStatus: boolean) => {

        mutate(
            {
                _id: tenantId,
                newStatus: newStatus
            },

            {
                onSuccess: () => {
                    toast.success('Tenant status updated!')
                },
                onError: () => {
                    toast.error('Tenant status not updated!')
                }
            })
    }

    return (
        <>
            <Menu>
                <MenuButton as={Box}
                    className="p-2 bg-zinc-700/10 rounded-full flex justify-center items-center cursor-pointer">
                    <FiEdit size='1em' />
                </MenuButton>

                <MenuList>
                    <MenuItem
                        color='green.400'
                        fontWeight='semibold'
                        onClick={() => toggleStatus(true)}>
                        Active
                    </MenuItem>
                    <MenuItem
                        color='red.400'
                        fontWeight='semibold'
                        onClick={() => toggleStatus(false)}>
                        Inactive
                    </MenuItem>
                </MenuList>

            </Menu>
        </>
    )
}

export default StatusUpdater