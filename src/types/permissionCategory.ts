import { Pagination } from "./common";

export interface PermissionCategory{
    id:number;
    name:string;
    description:string;
}

export interface PermissionCategoryListResponse{
    data:PermissionCategory[];
    pagination:Pagination;
}