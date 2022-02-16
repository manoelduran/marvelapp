import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

interface AuthProviderProps {
    children: ReactNode;
};

interface AuthContextData {
    user: User | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    loadUser: () => Promise<void>;
    signOut: () => Promise<void>;
    createAccount: () => Promise<void>;
    forgotPassword: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>({} as User);
    const [loading, setLoading] = useState(false);
    const { setItem, getItem, removeItem } = useAsyncStorage('@marvelland:user')
    async function signIn(email: string, password: string) {
        if (!email || !password) {
            return Alert.alert('Login', 'Informe o email e a senha');
        };
        setLoading(true);
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(account => {
                firestore()
                    .collection('users')
                    .doc(account.user.uid)
                    .get()
                    .then(async (profile) => {
                        const { name, isAdmin } = profile.data() as User;
                        if (profile.exists) {
                            ;
                            const userData = {
                                id: account.user.uid,
                                name,
                                isAdmin
                            };
                            await setItem(JSON.stringify(userData));
                            setUser(userData);
                        };
                    })
                    .catch(() => {
                        Alert.alert('Login', 'Não foi possivel buscar os dados do usuario');
                    })
            })
            .catch(error => {
                const { code } = error;
                if (code === 'auth/user-not-found' || code === 'auth/wrong-password') {
                    return Alert.alert('Login', 'E-mail ou senha inválidos')
                } else {
                    return Alert.alert('Login', 'Não foi possível realizar o login');
                };
            })
            .finally(() => setLoading(false));
    };
    async function signOut() {
        auth()
            .signOut();
        await removeItem();
        setUser(null);
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
        <AuthContext.Provider value={{ loading,createAccount, forgotPassword, loadUser, signIn, signOut, user }} >
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    return context;
};

export { AuthProvider, useAuth }