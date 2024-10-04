import { AxiosRequestConfig } from "axios";
import APIClient from "../services/apiClient";
import { useAuth } from "../store/authToken";
import { Tenant } from "../pages/ShowTenantDetails";
import { useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_TENANTS } from "./constants";

const useAddTenant = () => {
    const { authenticatedUser } = useAuth();
    const queryClient = useQueryClient(); // Move the hook call here

    const uploadData = async (tenantData: Tenant, config: AxiosRequestConfig = {}) => {
        
        const apiClient = new APIClient<Tenant>(`/api/add-tenant/${authenticatedUser?._id}`);

        try {
            const response = await apiClient.post(
                tenantData,
                {
                    ...config,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('serverToken')}`,
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            // Invalidate the query after a successful upload
            queryClient.invalidateQueries({
                queryKey: [CACHE_KEY_TENANTS, authenticatedUser?._id],
            });


            return response;
            
        } catch (error) {
            console.error("Error uploading tenant data:", error);
        }
    };

    return { uploadData };
};

export default useAddTenant;
