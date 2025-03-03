import Axios from "@/config/axios";
import { addToCart } from "@/redux/reducer/cartReducer";
import { CartItem, User } from "@/types/types";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type UserContextType = {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>
    getUser: () => Promise<void>;
    getCartItems: () => Promise<void>;
}


export const AuthContext = createContext<UserContextType | undefined>(undefined);

type childProp = {
    children: ReactNode,
}

export const UserContextProvider = ({ children }: childProp) => {

    // const userData = decryptData(value);
    const [user, setUser] = useState<User | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        getUser();
    }, [])

    useEffect(() => {
        getCartItems();
    }, [user])



    const getUser = async () => {
        try {
            const { data } = await Axios.get('/user/verify');

            if (data) {
                setUser(data.user);
            }

        } catch (error) {
            console.log(error);
        }
    }

    const getCartItems = async () => {

        let cartItems: CartItem[] | [] = [];

        try {
            const { data } = await Axios.get(`/cartItems/all`);

            if (data) {
                cartItems = data.cartItems;
                cartItems.map(item => dispatch(addToCart(item)));
            }
        } catch (error) {
            console.log("Error - ", error);
        }

    }


    return (
        <AuthContext.Provider value={{ user, setUser, getUser, getCartItems }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error('context not providing...');

    return context;
}