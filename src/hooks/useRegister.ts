import axios from "axios";
import { formData } from "../pages/Register";
import { useMutation } from "@tanstack/react-query";
import { apiClientOK } from "../services/apiClient";

const useRegister = () => {

    return useMutation<formData, Error, formData>({
        mutationFn: (data: formData) => {
            return axios
                .post(
                    `${apiClientOK}/api/auth/register`,
                    data
                )
                .then(res => res.data)
        }
    })

}

export default useRegister;