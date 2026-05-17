import { Pagination } from "./common";
import { PermissionCategory } from "./permissionCategory";

    export interface Permission{
        id:number;
        name:string;
        permissionCategoryId:number;
        permissionCategory?:PermissionCategory;
    }

export interface PermissionListResponse{
    data:Permission[];
    pagination:Pagination;
}