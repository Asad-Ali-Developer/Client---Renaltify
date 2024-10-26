import axios from "axios";
import { formData } from "../pages/Register";
import { apiClientOK } from "../services/apiClient";

const useRegister = () => {

    const registerUser = async (data: formData) => {

        try {
            const response = await axios
                .post(`${apiClientOK}/api/auth/register`, data)

            return response.data

        } catch (error) {
            console.log(error);
        }
    }

    return registerUser
}

export default useRegister;