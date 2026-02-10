import { RoleUser } from "./Enums/user.enum"

export type JwtPayloadType={
    id:number,
    role:RoleUser
}