

export const Constants = {
     basic:"Basic",
     base64: "base64",
     ascii: "ascii",
     pending: "pending",
     email:"email",
     password:"password",
     user:"user",
     approved:"approved",
     otpExpiryMinutes: 5
}

export enum RoleIds {
     admin = 1,
     company,
     user
}


export const determineUserRole = (roleId: number) => {
     if(RoleIds.admin === roleId){
          return "admin";
     }
     else if(RoleIds.company === roleId){
          return "company";
     }
     else{
          return "user";
     }
}
