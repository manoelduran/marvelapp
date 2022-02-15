import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';

interface AuthProviderProps {
    children: ReactNode;
};

interface AuthContextData {
    user: User | null;
    signIn: () => Promise<void>;
    loadUser: () => Promise<void>;
    signOut: () => Promise<void>;
    createAccount: () => Promise<void>;
    forgotPassword: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>({} as User);
    async function signIn() {

    }
    async function signOut() {

    }
    async function createAccount() {

    }
    async function loadUser() {

    }
    async function forgotPassword() {

    }
    useEffect(() => {
        loadUser();
    }, [])
    return (
        <AuthContext.Provider value={{ createAccount, forgotPassword, loadUser, signIn, signOut, user }} >
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    return context;
};

export { AuthProvider, useAuth }