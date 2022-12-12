

export const Constants = {
     basic: "Basic",
     base64: "base64",
     ascii: "ascii",
     pending: "pending",
     email: "email",
     password: "password",
     user: "user",
     approved: "approved",
}

export enum RideRequestStatus {
     pending,
     accepted,
     rejected,
     cancelled,
     not_coming_today
}

export enum RoleIds {
     admin = 1,
     company,
     user
}