import { create } from 'zustand';
import { PermissionCategory } from '../types/permissionCategory';
import { ItemCategory } from '../types/ItemCategory';
interface ItemCategoryState {
    selectedItemCategory: ItemCategory | null;
    setSelectedItemCategory: (item: ItemCategory | null) => void
}

export const useItemCategoryStore = create<ItemCategoryState>((set) => ({
    selectedItemCategory: null,
    setSelectedItemCategory(item) {
        set({selectedItemCategory:item})
    },
}));