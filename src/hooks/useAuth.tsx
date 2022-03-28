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
    signOut: () => Promise<void>;
    createAccount: (email: string, password: string) => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const { setItem, getItem, removeItem } = useAsyncStorage('@marvelland:usuario');
    async function signIn(email: string, password: string) {
        if (!email || !password) {
            return Alert.alert('Login', 'Provide email and password!');
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
                            console.log('Login', userData);
                            setUser(userData);
                        };
                    })
                    .catch(() => {
                        Alert.alert('Login', 'Unable to fetch user data');
                    })
            })
            .catch(error => {
                const { code } = error;
                if (code === 'auth/user-not-found' || code === 'auth/wrong-password') {
                    return Alert.alert('Login', 'Invalid email or password!')
                } else {
                    return Alert.alert('Login', 'Unable to login!');
                };
            })
            .finally(() => setLoading(false));
    };
    async function signOut() {
        auth()
            .signOut();
        await removeItem();
        setUser(null);
        console.log('Delete', user)
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
                        return Alert.alert('Create Account', 'Account created successfully!');
                    })
                    .catch((error) => {
                        const { code } = error;
                        if (code === 'auth/email-already-in-use') {
                            return Alert.alert('Login', 'E-mail já cadastrado.');
                        } else {
                            return Alert.alert('Create Account', 'Error trying to create account!');
                        }
                    });
            });
    };
    async function loadUser() {
        const userCollection = await getItem();
        if (userCollection) {
            const parsedUser = await JSON.parse(String(userCollection)) as User;
            signIn(parsedUser.name, String(parsedUser.password))
        };
    };

    async function forgotPassword(email: string) {
        if (!email) {
            return Alert.alert('Reset Password', 'E-mail is required!');
        };
        auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                return Alert.alert('Reset Password', 'An E-mail has been sent with the password reset link into your E-mail!');
            })
            .catch(() => {
                return Alert.alert('Reset Password', 'It was not possible to send the email. Try later!');
            });
    };
    useEffect(() => {
        loadUser()
    }, []);
    return (
        <AuthContext.Provider value={{ loading, createAccount, forgotPassword, signIn, signOut, user }} >
            {children}
        </AuthContext.Provider>
    );
};

function useAuth() {
    const context = useContext(AuthContext);
    return context;
};

export { AuthProvider, useAuth };