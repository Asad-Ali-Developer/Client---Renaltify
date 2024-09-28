import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { apiClient } from "../apiClient";

interface AuthenticatedUser {
    _id: string,
    username: string,
    email: string,
    isAdmin: boolean,
    token: string,
    IdFileLink: string,
}

interface Tenants {
    _id: string,
    phone: number,
    idNumber: string,
    isActive: boolean,
    tenantName: string,
    rentDecided: number
}


interface ContextType {
    storeTokenInLS: (serverToken: string) => void
    UserAuthentication: () => void;
    LogoutUser: () => void
    authenticatedUser: AuthenticatedUser | null
    isLoggedIn: boolean
    getAllTenants: () => void
    tenants: Tenants[]
    totalTenants: number | null
    activeTenants: number | null

}

interface Props {
    children: ReactNode
}

export const AuthContext = createContext<ContextType | undefined>(undefined);

export const AuthProvider = ({ children }: Props) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('serverToken'));
    const [authenticatedUser, setAuthenticatedUser] = useState<AuthenticatedUser | null>(null);
    const [tenants, setTenants] = useState<Tenants[]>([])
    const [totalTenants, setTotalTenants] = useState<number | null>(null)
    const [activeTenants, setActiveTenants] = useState<number | null>(null)


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
            const response = await fetch(`${apiClient}/api/auth/user`, {
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



    const getAllTenants = async () => {

        try {
            const response = await fetch(
                `${apiClient}/api/all-tenants/${authenticatedUser?._id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('serverToken')}`,
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const res_data = await response.json();
            // Check if tenants array is present
            const fetchedTenants = res_data.tenants || [];
            setTenants(fetchedTenants);

            setTotalTenants(fetchedTenants.length);

            setActiveTenants(fetchedTenants.filter((tenant: Tenants) => tenant.isActive).length);

        } catch (error) {
            console.log(error);
            // Handle error case
            setTotalTenants(0);
            setActiveTenants(0);
        }
    }



    useEffect(() => {
        if (isLoggedIn) {
            UserAuthentication();
        }
        if (authenticatedUser?._id) {
            getAllTenants();
        }
    }, [isLoggedIn, authenticatedUser?._id]);




    return (
        <AuthContext.Provider value={{ storeTokenInLS, LogoutUser, UserAuthentication, getAllTenants, authenticatedUser, isLoggedIn, tenants, totalTenants, activeTenants }}>
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
