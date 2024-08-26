"use client"

import { useRouter } from "next/navigation";

import LoginUser from "@/app/actions/login";

const { createContext, useState, useContext } = require("react");

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const router = useRouter();

    //*** */ login functionality
    const login = async ({ username, password }) => {
        try {
            // console.log(username);
            setIsLoading(true)

            const res = await LoginUser(username, password);

            console.log(res.success);

            if (res?.success === true) {
                setIsAuthenticated(true)
                setIsLoading(false)

                router.push("/")
            }
        } catch (error) {
            setIsLoading(false)
            setError(error.response && (error.response.data.detail || error.response.data.error))
        }
    }

    return <AuthContext.Provider value={{isLoading, error,user,isAuthenticated, login}}>
        {children}
    </AuthContext.Provider>
}

export const useGlobalAuthContext = () => {
    return useContext(AuthContext)
}