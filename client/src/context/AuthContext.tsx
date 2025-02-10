import Axios from "@/config/axios";
import { User } from "@/types/types";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

type UserContextType = {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>
}


export const AuthContext = createContext<UserContextType | undefined>(undefined);

type childProp = {
    children: ReactNode,
}

export const UserContextProvider = ({children}: childProp) => {

    // const userData = decryptData(value);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        getUser();
    }, [])


    const getUser = async () => {
        try {
            const { data } = await Axios.get('/user/verify');

            if(data) {
                setUser(data.user);
            }

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context)
        throw new Error('context not providing...'); 
    
    return context; 
}