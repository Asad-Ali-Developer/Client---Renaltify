import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_TENANT } from "./constants";
import axios from "axios";
import { apiClientOK } from "../services/apiClient";

interface Tenant {
    _id?: string;
    tenantName?: string;
    phone?: number;
    AnotherPhone?: number;
    members?: number;
    address?: string;
    rentDecided?: string;
    date?: string;
    idNumber?: string;
    IdFileLink?: string;
    isActive?: boolean;
    QrCode?: string;
}

const useTenant = (id: string) => {

    const { data, isLoading } = useQuery<Tenant, Error>({

        enabled: !!id,

        queryKey: [CACHE_KEY_TENANT, id],

        staleTime: 30 * 60 * 1000,

        queryFn: () => axios
            .get<{ tenant: Tenant }>(`${apiClientOK}/api/tenant/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('serverToken')}`,
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }).then(res => res.data.tenant),


    })

    return { isLoading, tenant: data || {} };

}

export default useTenant;