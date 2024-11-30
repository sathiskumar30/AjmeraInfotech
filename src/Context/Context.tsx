import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { AppContextType } from "../Types/Context.type";
import { ContextProviderType } from "../Types/Context.type";
import { Profile } from "../Types/profile.type";

const AppContext = createContext<AppContextType | undefined>(undefined);


export const ContextProvider: React.FC<ContextProviderType> = ({ children }) => {

    const [user, setUser] = useState<string | null>(null);
    const [loading, setLoading] = useState<Boolean>(false);
    const [error, setError] = useState<any>(null);

    const [profile, setProfile] = useState<Profile[]>([]);

    const [myProfile, setMyProfile] = useState<any>(null);

    const [createMode, setCreateMode] = useState<Boolean>(false)
    const [myProfileCreateMode, setMyProfileCreateMode] = useState<Boolean>(false)
    const [editMode, setEditMode] = useState<Boolean>(false)

    const [ editProfileId , setEditProfileId ] = useState<any>(null);
    const [ reload , setReload ] = useState<Boolean>(false);


    useEffect(()=>{
        setReload(false);
    },[])


    let URI : string ;

    if (import.meta.env.VITE_APP_STATUS === 'DEV') {
        URI = import.meta.env.VITE_DEV_URL
    } else if (import.meta.env.VITE_APP_STATUS === 'PROD') {
        URI = import.meta.env.VITE_PROD_URL
    } else {
        URI = import.meta.env.VITE_DEV_URL
    }

    useEffect(() => {
        const localStorageProfile = localStorage.getItem('myprofile');
    
        if (localStorageProfile) {
            try {
                const parsedData = JSON.parse(localStorageProfile);

                setMyProfile(parsedData);
            } catch (error) {
                console.error('Error parsing localStorage data:', error);
            }
        }
    }, []);
    

    return (
        <AppContext.Provider value={{
            user, setUser, URI, profile,
            setProfile, loading, setLoading, error,
            setError, myProfile, setMyProfile,
            createMode, setCreateMode, myProfileCreateMode,
            setMyProfileCreateMode, editMode, setEditMode,
            editProfileId , setEditProfileId,reload , setReload
        }}>
            {children}
        </AppContext.Provider>
    );
};



export const useContextHook = (): AppContextType => {

    const context = useContext(AppContext);

    if (!context) {
        throw new Error('Something went wrong in useContext');
    }

    return context;

} 