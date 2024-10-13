import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { apiClientOK } from "../services/apiClient";

interface AuthenticatedUser {
    _id: string,
    username: string,
    email: string,
    isAdmin: boolean,
    token: string,
    IdFileLink: string,
}


interface ContextType {
    storeTokenInLS: (serverToken: string) => void
    UserAuthentication: () => void;
    LogoutUser: () => void
    authenticatedUser: AuthenticatedUser | null
    isLoggedIn: boolean
}


interface Props {
    children: ReactNode
}


export const AuthContext = createContext<ContextType | undefined>(undefined);


export const AuthProvider = ({ children }: Props) => {
    
    const [token, setToken] = useState<string | null>(localStorage.getItem('serverToken'));
    const [authenticatedUser, setAuthenticatedUser] = useState<AuthenticatedUser | null>(null);


    const storeTokenInLS = (serverToken: string) => {
        localStorage.setItem('serverToken', serverToken);
        setToken(serverToken);
    };

    const LogoutUser = () => {
        setToken(null);
        localStorage.removeItem('serverToken');
        setAuthenticatedUser(null);
    };


    const isLoggedIn = !!token;


    const UserAuthentication = async () => {
        if (!token) return;

        try {
            const response = await fetch(`${apiClientOK}/api/auth/user`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setAuthenticatedUser(data.userData);
                console.log(data.userData);
            } else {
                LogoutUser();
            }

        } catch (error) {
            console.log(error);
            LogoutUser();
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            UserAuthentication();
        }

    }, [isLoggedIn, authenticatedUser?._id]);


    return (
        <AuthContext.Provider value={{ storeTokenInLS, LogoutUser, UserAuthentication, authenticatedUser, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const contextValue = useContext(AuthContext);
    if (!contextValue) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return contextValue;
};
