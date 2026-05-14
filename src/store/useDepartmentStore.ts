import { create } from "zustand";
import { Department } from "../types/department";
interface DepartmentState {
    selectedDepartment: Department | null;
    setSelectedDepartment: (dept: Department | null) => void;
}

export const useDepartmentStore = create<DepartmentState>((set) => ({
    selectedDepartment: null,
    setSelectedDepartment: (dept) => set({ selectedDepartment: dept }),
}));