import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_TENANTS } from "./constants";
import { useAuth } from "../store/authToken";
import APIClient from "../services/apiClient";

export interface Tenants {
    _id: string;
    phone: number;
    idNumber: string;
    isActive: boolean;
    tenantName: string;
    rentDecided: number;
}


const useAllTenants = () => {
    const { authenticatedUser } = useAuth(); // Retrieve authenticated user

    return useQuery<Tenants[], Error>({
        queryKey: [CACHE_KEY_TENANTS, authenticatedUser?._id], // Cache key includes userId
        queryFn: () => {
            if (!authenticatedUser?._id) {
                return [];
            }
            
            const apiClient = new APIClient<Tenants>(`/api/all-tenants/${authenticatedUser._id}`);


            return apiClient.getAll({
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('serverToken')}`,
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
        },
        staleTime: 24 * 60 * 60 * 1000, // 24 hours cache validity
        cacheTime: 24 * 60 * 60 * 1000,
        enabled: !!authenticatedUser?._id, // Only run the query if the user ID is available
    });

    // return tenants
};

export default useAllTenants;
