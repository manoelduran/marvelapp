import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { Alert } from 'react-native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

interface AuthProviderProps {
    children: ReactNode;
};

interface AuthContextData {
    user: User | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    loadUser: () => Promise<void>;
    signOut: () => Promise<void>;
    createAccount: (email: string, password: string) => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>({} as User);
    const [loading, setLoading] = useState(false);
    const { setItem, getItem, removeItem } = useAsyncStorage('@marvelland:usuario');
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
                    .doc(email)
                    .get()
                    .then(async (profile) => {
                        const { name, isAdmin, password, photoUrl, photo_path, buttonId } = profile.data() as User;
                        if (profile.exists) {
                            const userData = {
                                id: account.user.uid,
                                name,
                                isAdmin,
                                password,
                                photoUrl,
                                photo_path,
                                buttonId
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
    };
    async function createAccount(email: string, password: string) {
        await auth()
            .createUserWithEmailAndPassword(email, password)
            .then(account => {
                firestore()
                    .collection('users')
                    .doc(email)
                    .set({
                        id: account.user.uid,
                        isAdmin: false,
                        name: email,
                        password: password,
                        photoUrl: '',
                        photo_path: '',
                        buttonId: false,
                    })
                    .then(() => {
                        return Alert.alert('Create Account', 'Conta criada com sucesso');
                    })
                    .catch(() => {
                        return Alert.alert('Create Account', 'Erro ao tentar criar conta');
                    });
            });
    };
    async function loadUser() {
        const userCollection = await getItem();
        if (userCollection) {
            const parsedUser = await JSON.parse(userCollection) as User;
            setUser(parsedUser);
        };
    };
    async function forgotPassword(email: string) {
        if (!email) {
            return Alert.alert('Reset Password', 'Informe o E-mail');
        };
        auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                return Alert.alert('Reset Password', 'Foi enviado um E-mail com o link para redefinição de senha no seu E-mail.');
            })
            .catch(() => {
                return Alert.alert('Reset Password', 'Não foi possivel enviar o E-mail');
            });
    };
    useEffect(() => {
        loadUser();
    }, []);
    return (
        <AuthContext.Provider value={{ loading, createAccount, forgotPassword, loadUser, signIn, signOut, user }} >
            {children}
        </AuthContext.Provider>
    );
};

function useAuth() {
    const context = useContext(AuthContext);
    return context;
};

export { AuthProvider, useAuth };