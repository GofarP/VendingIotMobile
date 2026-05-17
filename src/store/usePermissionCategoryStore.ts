import {create} from "zustand"
import { PermissionCategory } from "../types/permissionCategory"
interface PermissionCategoryState{
    selectedPermissionCategory:PermissionCategory|null;
    setSelectedPermissionCategory:(perm:PermissionCategory|null)=>void
}


export const usePermissionCategoryStore = create<PermissionCategoryState>((set) => ({
    selectedPermissionCategory: null,
    setSelectedPermissionCategory: (perm) => set({ selectedPermissionCategory: perm }),
}));