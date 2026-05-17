import { Pagination } from "./common";

export interface ItemCategory{
    id:number;
    name:string;
    description:string;
}

export interface ItemCategoryListResponse{
    data:ItemCategory[];
    pagination:Pagination;
}