"use client"

import { useRouter } from "next/navigation";

import LoginUser from "@/app/actions/login";
import GetUser from "@/app/actions/getUser";
import LogoutUser from "@/app/actions/logout";

const { createContext, useState, useContext, useEffect } = require("react");

const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (!user) {
            loadUser();
        }
    }, [user]);

    //*** */ login functionality
    const login = async ({ username, password }) => {
        try {
            // console.log(username);
            setIsLoading(true)

            const res = await LoginUser(username, password);

            // console.log(res.success);

            if (res?.success === true) {
                loadUser()
                setIsAuthenticated(true)
                setIsLoading(false)

                router.push("/")
            }
        } catch (error) {
            setIsLoading(false)
            setError(error.response && (error.response.data.detail || error.response.data.error))
        }
    }

    const loadUser = async () => {
        try {
            // console.log(username);
            setIsLoading(true);

            const res = await GetUser();

            // console.log(res);

            if (res?.user) {
                setIsAuthenticated(true);
                setIsLoading(false);

                setUser(res.user)
            }

            setIsLoading(false)
        } catch (error) {
            setIsLoading(false);
            setIsAuthenticated(false)
            setUser(null)
            setError(
                error.response &&
                    (error.response.data.detail || error.response.data.error)
            );
        }
    };
    const logoutUser = async () => {
        try {

            const res = await LogoutUser()

            if (res?.success) {
                setIsAuthenticated(false);

                setUser(null)
            }

        } catch (error) {
            setIsLoading(false);
            setIsAuthenticated(false)
            setUser(null)
            setError(
                error.response &&
                    (error.response.data.detail || error.response.data.error)
            );
        }
    };

    return <AuthContext.Provider value={{isLoading, error,user,isAuthenticated, login, loadUser, logoutUser}}>
        {children}
    </AuthContext.Provider>
}

export const useGlobalAuthContext = () => {
    return useContext(AuthContext)
}