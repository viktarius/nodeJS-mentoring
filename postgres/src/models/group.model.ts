import { Permission } from "./permission.model";

export interface Group {
    id?: number;
    name: string;
    permissions: Array<Permission>
}
