import axios from "axios";
import { CACHE_KEY_TENANTS } from "./constants";
import { useQuery } from "@tanstack/react-query";
import { apiClientOK } from "../services/apiClient";

export interface Tenant {
    _id: string,
    tenantName: string,
    phone: number,
    AnotherPhone: number,
    members: number,
    address: string,
    rentDecided: string,
    date: string,
    idNumber: string,
    IdFileLink: string,
    isActive: boolean,
    QrCode: string
};

interface TenantsResponse {
    tenants: Tenant[];
}

interface queryTenants {
    _id?: string;
    userName?: string;
}

const useAllTenants = (query: queryTenants) => {

    const { data, isLoading } = useQuery<TenantsResponse, Error>({

        enabled: !!query._id,

        queryKey: [CACHE_KEY_TENANTS, `Tenants of '${query.userName}' and id: ${query._id}`],

        staleTime: 60 * 60 * 1000, // 60 minutes

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

    const totalTenants = tenants.length || 0;

    const activeTenants = tenants.filter((tenant: Tenant) => tenant.isActive).length || 0;

    const inactiveTenants = tenants.filter((tenant: Tenant) => !tenant.isActive).length || 0;

    return { tenants, totalTenants, activeTenants, isLoading, inactiveTenants };

}

export default useAllTenants;