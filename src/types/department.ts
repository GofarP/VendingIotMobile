import { Pagination } from "./common";

export interface Department{
    id:number;
    name:string;
    description:string;
}

export interface DepartmentListResponse{
    data:Department[];
    pagination:Pagination;
}