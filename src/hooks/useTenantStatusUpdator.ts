import axios from "axios";
import { CACHE_KEY_TENANT, CACHE_KEY_TENANTS } from "./constants";
import { apiClientOK } from "../services/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface updateTenantQuery {
    _id: string | undefined,
    newStatus: boolean,
}

const useTenantStatusUpdater = () => {

    const queryClient = useQueryClient()

    return useMutation<Error, string, updateTenantQuery>({

        mutationFn: (query: updateTenantQuery) => axios
            .patch(`${apiClientOK}/api/update-tenant/${query._id}`,
                { isActive: query.newStatus },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('serverToken')}`,
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            )
            .then(res => res.data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [CACHE_KEY_TENANTS]
            })

            queryClient.invalidateQueries({
                queryKey: [CACHE_KEY_TENANT]
            })
        }
    })
}

export default useTenantStatusUpdater;