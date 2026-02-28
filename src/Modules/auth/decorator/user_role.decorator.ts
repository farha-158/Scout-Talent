import { SetMetadata } from "@nestjs/common";
import { RoleUser } from "src/utils/Enums/user.enum";

export const Roles=(...roles:RoleUser[])=>SetMetadata('roles',roles)