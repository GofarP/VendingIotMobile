import {create} from "zustand"
import { Permission } from "../types/permission"
interface PermissionState{
    selectedPermission:Permission|null;
    setSelectedPermission:(perm:Permission|null)=>void;
}


export const usePermissionStore=create<PermissionState>((set)=>({
    selectedPermission:null,
    setSelectedPermission:(perm)=>set({selectedPermission:perm})
}));