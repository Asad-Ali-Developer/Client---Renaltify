import { createContext } from "react";
import { Tenant } from "../hooks/useAllTenants";

interface TenantsContextType {
    tenants: Tenant[]
    activeTenants: number
    totalTenants: number
    inactiveTenants: number
    isLoading: boolean
}

const TenantsContext = createContext<TenantsContextType>({} as TenantsContextType)
export default TenantsContext;