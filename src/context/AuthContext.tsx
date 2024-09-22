"use client"
import { ReactNode, createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebaseConnection';
import { UserProps } from '@/utils/types/User'

interface AuthProviderProps{
    children: ReactNode;
}

type AuthContextData = {
    signed: boolean;
    loadingAuth: boolean;
    handleInfoUser: ({ name, email, uid }: UserProps) => void;
    user: UserProps | null;
}

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps){
    const [user, setUser] = useState<UserProps | null>(null);
    const [loadingAuth, setLoadingAuth] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if(user){
                setUser({
                    uid: user.uid,
                    name: user?.displayName,
                    email: user?.email
                })
                setLoadingAuth(false)
            } else {
                setUser(null);
                setLoadingAuth(false);
            }
        })

        return () => {
            unsub();
        }
    }, [])

    /* função utizada para quando existir a tela de registro */
    function handleInfoUser({ name, email, uid }: UserProps){
        setUser({
            name,
            email,
            uid
        })
    }

    return (
        <AuthContext.Provider 
            value={{ 
                signed: !!user,
                loadingAuth,
                handleInfoUser,
                user,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;