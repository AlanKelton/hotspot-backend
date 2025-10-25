import {User} from "../../user/user";

export interface Invite {
    code: string;
    link: string;
    status: 'PENDING' | 'USED' | 'REVOKED' | 'NEW';
    usedBy?: User;
}
