import { ReactNode } from "react";
import { Profile } from "../Types/profile.type";


export interface AppContextType {
    user: string | null;
    setUser: (user: string | null) => void;
    URI: string;
    profile: Profile[];
    setProfile: (profile: Profile[] | any) => void;
    loading: Boolean;
    setLoading: (loading: Boolean) => void;
    error: any;
    setError: (error: any) => void;
    myProfile: any;
    setMyProfile: (profile: any) => void;
    createMode: Boolean;
    setCreateMode: (loading: Boolean) => void;
    myProfileCreateMode: Boolean;
    setMyProfileCreateMode: (loading: Boolean) => void;
    editMode: Boolean;
    setEditMode: (loading: Boolean) => void;
    editProfileId : any
    setEditProfileId : (editProfileId : any) => void;
    reload:Boolean;
    setReload:(reload : Boolean) => void

}

export interface ContextProviderType {
    children: ReactNode;
}