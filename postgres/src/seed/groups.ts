import { Group } from "../models";

export const groups: Array<Group> = [{
    name: 'first',
    permissions: ['WRITE', 'DELETE', 'READ']
}, {
    name: 'second',
    permissions: ['READ']
}];
