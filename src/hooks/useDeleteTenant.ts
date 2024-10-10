import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClientOK } from "../services/apiClient";
import { CACHE_KEY_TENANTS } from "./constants";
import axios from "axios";


const useDeleteTenant = () => {

  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({

    mutationFn: (_id: string) => axios
      .delete(`${apiClientOK}/api/delete-tenant/${_id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('serverToken')}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true
      })

      .then(res => res.data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_TENANTS]
      })
    }

  })
}


export default useDeleteTenant