"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

type AuthContextType = {
    user: string | null;
    login: (name: string) => void;
    logout: () => void;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(storedUser);
    }, []);

    const login = (name: string) => {
        localStorage.setItem("user", name);
        setUser(name);
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        //@ts-ignore
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    //@ts-ignore
    return useContext(AuthContext);
}
