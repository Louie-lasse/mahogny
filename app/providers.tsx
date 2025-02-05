"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";
import { Connection } from "./connection";

const AuthContext = createContext(null);

type User = {
    name: string;
    password: string;
}

type AuthContextType = {
    user: User | null;
    connection: Connection | null,
    login: (name: string, password: string) => Promise<boolean>;
    logout: () => void;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [connection, setConnection] = useState<Connection | null>(null);
    const router = useRouter();

    const login = async (name: string, password: string) => {
        const conn = new Connection();
        const success = await conn.login(name, password);
        
        if (!success) return false;
        
        setUser({ name, password });
        setConnection(conn);
        router.push("/");
    };

    const logout = () => {
        setUser(null);
        setConnection(null);
        router.push("/login");
    };

    return (
        //@ts-ignore
        <AuthContext.Provider value={{ user, connection, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    //@ts-ignore
    return useContext(AuthContext);
}
