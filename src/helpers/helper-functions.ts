import { RoleIds } from "../core/constants/constants";


export const response = (status: boolean, responseCode: number, message: string, data: any) => {
    return {
        status,
        responseCode,
        message,
        data: data || {}
    }
}

export const determineUserRole = (roleId: number) => {
    if (RoleIds.admin === roleId) {
        return "admin";
    }
    else if (RoleIds.company === roleId) {
        return "company";
    }
    else {
        return "user";
    }
}