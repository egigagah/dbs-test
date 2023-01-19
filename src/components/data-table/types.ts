import { ReactNode } from "react";

export type ColumnDefs = {
    column: string;
    target: string;
    customColumn?: (data: any, row?: any) => ReactNode;
};

export type RelationsType = "brother" | "sister" | "parent" | "child";

export type FamilyDatas = {
    name?: string;
    dob?: string;
    relation?: RelationsType;
};

export type DataDefs = {
    name: string;
    ktp: string;
    address: string;
    job: string;
    dob: string;
    phone: string[];
    family: FamilyDatas[];
};

export type DataTableProps = {
    columnDefs: ColumnDefs[];
    data: DataDefs[];
};
