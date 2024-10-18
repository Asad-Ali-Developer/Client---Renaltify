import axios from "axios";
import { apiClientOK } from "../services/apiClient";
import { useAuth } from "../store/authToken";
import { Tenant } from "../hooks/useAllTenants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_TENANTS } from "./constants";

const useAddTenant = () => {
    const { authenticatedUser } = useAuth();

    const id = authenticatedUser?._id

    const queryClient = useQueryClient()

    return useMutation<Tenant, Error, Tenant>({

        mutationFn: (tenantData: Tenant) =>
            axios
                .post(
                    `${apiClientOK}/api/add-tenant/${id}`,
                    tenantData,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('serverToken')}`,
                            'Content-Type': 'application/json',
                        }
                    }
                ).then(res => res.data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [CACHE_KEY_TENANTS]
            })
        }

    })


};

export default useAddTenant;
