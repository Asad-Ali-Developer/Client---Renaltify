import { AxiosRequestConfig } from "axios";
import APIClient from "../services/apiClient";
import { useAuth } from "../store/authToken";
import { Tenant } from "../pages/ShowTenantDetails";



const useAddTenant = () => {

    const { authenticatedUser } = useAuth();

    // This is because, we are receiving an object [config: AxiosRequestConfig = {}]
    
    const uploadData = async (tenantData: Tenant, config: AxiosRequestConfig = {}) => {    

        const apiClient = new APIClient<Tenant>(`/api/add-tenant/${authenticatedUser?._id}`)

        try {
            const response = await apiClient
                .post(

                    // The data to be upload
                    tenantData,
                    
                    // The configurations
                    {
                        // Adding configurations
                        ...config,
    
                        // Setting headers ...
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('serverToken')}`,
                            'Content-Type': 'application/json',
                        },
    
                        withCredentials: true,
                    }

                );

            return response.data;

        } catch (error) {
            console.error("Error uploading tenant data:", error);
        }
    };

    return { uploadData };
};

export default useAddTenant;
