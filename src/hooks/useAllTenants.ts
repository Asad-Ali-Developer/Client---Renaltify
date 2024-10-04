import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_TENANTS } from "./constants";
import { apiClientOK } from "../services/apiClient";
import axios from "axios";

interface TenantsResponse {
    tenants: Tenant[];
}

export interface Tenant {
    _id: string;
    phone: number;
    idNumber: string;
    isActive: boolean;
    tenantName: string;
    rentDecided: number;
}

interface queryTenants {
    _id?: string;
    tenantName?: string;
}

const useAllTenants = (query: queryTenants) => {

    const { data } = useQuery<TenantsResponse, Error>({

        enabled: !!query._id,

        queryKey: [CACHE_KEY_TENANTS, `Tenants of '${query.tenantName}' and id: ${query._id}`],

        staleTime : 20 * 60 * 1000, // 30 minutes

        queryFn: () =>
            axios
                .get<TenantsResponse>(`${apiClientOK}/api/all-tenants/${query._id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('serverToken')}`,
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                })
                .then((res) => res.data),
    })

    const tenants = data?.tenants || [];

    const totalTenants = tenants.length;

    const activeTenants = tenants.filter((tenant: Tenant) => tenant.isActive).length;

    console.log(totalTenants, activeTenants);

    return { tenants, totalTenants, activeTenants };

}

export default useAllTenants;
