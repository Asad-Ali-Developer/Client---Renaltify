import axios, { AxiosRequestConfig } from 'axios'
export const apiClientOK = 'https://server-production-3fb3.up.railway.app'
// export const apiClientOK = 'https://server-production-3fb3.up.railway.app'

const axiosInstance = axios.create({
    baseURL: 'https://server-production-3fb3.up.railway.app'
})

class APIClient<T> {

    endpoint: string

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    // This is for getting All Tenants
    getAll = (config: AxiosRequestConfig) =>
        axiosInstance
            .get<T[]>(this.endpoint, config)
            .then(res => {
                console.log('API Response:', res.data); // Log the API response
                return res.data;
            })

    // This is used for posting and uploading the data
    post = (data: T, config: AxiosRequestConfig) =>
        axiosInstance
            .post(this.endpoint, data, config)
            .then(res => res.data)

    // This is used for deleting the data
    delete = (config: AxiosRequestConfig) => {
        axiosInstance
            .delete(this.endpoint, config)
            .then(res => res.data)
    }

    // This is used for patching and updating the data
    update = (data: T, config: AxiosRequestConfig) => {
        axiosInstance
            .patch(this.endpoint, data, config)
            .then(res => res.data)
    }
}

export default APIClient;