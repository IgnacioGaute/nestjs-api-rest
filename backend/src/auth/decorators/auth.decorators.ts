import { applyDecorators, UseGuards } from "@nestjs/common";
import { Role } from "../../common/enums/rol.enums";
import { AuthGuard } from "../guard/auth.guard";
import { RolesGuard } from "../guard/roles.guard";
import { Roles } from "./rol.decorator";

export function Auth(rol: Role) {
  return applyDecorators(Roles(rol), UseGuards(AuthGuard, RolesGuard));
}