import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tenant } from "../pages/ShowTenantDetails";
import APIClient from "../services/apiClient";
import { CACHE_KEY_TENANTS } from "./constants";

const useDeleteTenant = () => {
  const queryClient = useQueryClient();

  const deleteTenantFn = async (id: string) => {

    const apiClient = new APIClient<Tenant>(`/api/delete-tenant/${id}`);

    const response = await apiClient.delete({
      headers: {
        Authorization: `Bearer ${localStorage.getItem('serverToken')}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
  };

  const mutation = useMutation<Tenant, Error, string>({
    mutationKey: [CACHE_KEY_TENANTS],
    mutationFn: deleteTenantFn,

    onSuccess: () => {
      // Invalidate the tenant cache to refetch the updated tenant list
      queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_TENANTS],
      });
    },
  });

  // Return the mutation object to use in the component
  return mutation;
};

export default useDeleteTenant;
