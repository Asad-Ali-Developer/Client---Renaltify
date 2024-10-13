import { ReactNode } from "react"
import TenantsContext from "../context/TenantsContext"
import { useAuth } from "./authToken"
import useAllTenants from "../hooks/useAllTenants"

interface Props {
    children: ReactNode
}

const TenantsProvider = ({ children }: Props) => {

    const { authenticatedUser } = useAuth()

    const _id = authenticatedUser?._id
    const userName = authenticatedUser?.username

    const { activeTenants, totalTenants, inactiveTenants, tenants, isLoading } = useAllTenants({ _id, userName })

    return (
        <TenantsContext.Provider value={{ activeTenants, totalTenants, inactiveTenants, tenants, isLoading }}>
            {children}
        </TenantsContext.Provider>
    )
}

export default TenantsProvider