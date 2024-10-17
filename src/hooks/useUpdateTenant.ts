import axios from "axios";
import { Tenant } from "./useAllTenants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClientOK } from "../services/apiClient";
import { CACHE_KEY_TENANTS } from "./constants";

interface updateTenantQuery {
    id: string | '';
    updatedData: Tenant
}

const useUpdateTenant = () => {

    const queryClient = useQueryClient()

    return useMutation<Tenant, Error, updateTenantQuery>({

        mutationFn: async ({ id, updatedData }) => {

            return axios
                .patch<Tenant>(
                    
                    // This is URL
                    `${apiClientOK}/api/update-tenant/${id}`,

                    // This is updated Data
                    updatedData,

                    // This is request configurations
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('serverToken')}`,
                            'Content-Type': 'application/json'
                        },

                        withCredentials: true,
                    }
                )
                .then(res => res.data)
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [CACHE_KEY_TENANTS]
            })
        }
    })

}

export default useUpdateTenant;