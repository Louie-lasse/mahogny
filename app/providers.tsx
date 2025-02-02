"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

type User = {
    name: string;
    password: string;
}

type AuthContextType = {
    user: User | null;
    connection: Connection | null,
    login: (name: string, password: string) => void;
    logout: () => void;
};

class Connection {
    constructor(public username: string, public password: string) {
        this.username = username;
        this.password = password;
        console.log(`Connected as ${username}`);
    }

    public show() {
        return `Connected as ${this.username}`;
    }

    public close() {
        console.log(`Disconnected from ${this.username}`);
    }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [connection, setConnection] = useState<Connection | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (user && !connection) {
            const conn = new Connection(user.name, user.password);
            setConnection(conn);
        }
    }, [user, connection]);

    const login = (name: string, password: string) => {
        const conn = new Connection(name, password);
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
