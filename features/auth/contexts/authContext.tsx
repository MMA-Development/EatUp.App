import {createContext, PropsWithChildren, useState} from "react";
import {router} from "expo-router";

export interface AuthContextProps {
    isAuthenticated: boolean;
    logIn: () => void;
    logOut: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    isAuthenticated: false,
    logIn: () => {},
    logOut: () => {},
})

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const logIn = () => {
        setIsAuthenticated(true);
        router.replace("/");
    };
    const logOut = () => {
        setIsAuthenticated(false);
        router.replace("/login");
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, logIn, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}