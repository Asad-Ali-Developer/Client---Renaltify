import axios from "axios";
import { formDataLogin } from "../pages/Login";
import { useMutation } from "@tanstack/react-query";
import { apiClientOK } from "../services/apiClient";
import { useAuth } from "../store/authToken";

const useLogin = () => {

    const { storeTokenInLS } = useAuth()

    return useMutation<formDataLogin, Error, formDataLogin>({
        mutationFn: (data: formDataLogin) => {
            return axios
                .post(
                    `${apiClientOK}/api/auth/login`
                    , data
                )
                .then(res => {
                    storeTokenInLS(res.data.token)
                    // console.log(res.data.token); // Working Great ...
                    return res.data;
                })
        }
    })
}

export default useLogin;