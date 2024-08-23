"use client"

const { createContext, useState, useContext } = require("react");

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return <AuthContext.Provider value={{isLoading, error,user,isAuthenticated}}>
        {children}
    </AuthContext.Provider>
}

export const useGlobalAuthContext = () => {
    return useContext(AuthContext)
}