export interface ActionResponse<T=any>{
    success:boolean;
    message:string;
    data?:T;
    errors?:Record<string, string[]>;
}

export interface Pagination{
    totalCount:number;
    pageSize:number;
    currentPage:number;
    totalPages:number;
}