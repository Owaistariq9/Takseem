

export const Constants = {
     basic: "Basic",
     base64: "base64",
     ascii: "ascii",
     pending: "pending",
     email: "email",
     password: "password",
     user: "user",
     approved: "approved",
     rider: "rider",
     passenger: "passenger"
}

export enum RideRequestStatus {
     pending,
     accepted,
     rejected,
     cancelled,
     not_coming_today,
     ride_started,
     ride_ended,
     picked
}

export enum RoleIds {
     admin = 1,
     company,
     user
}