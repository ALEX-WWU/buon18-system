import { z } from "zod";
import { Permission } from "./permission";

export interface Role {
  id: number;
  name: string;
  description: string;
  permissions: Permission[];
}

export const CreateRoleSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  permissions: z
    .array(
      z.object({
        id: z.number().min(1),
        name: z.string(),
      }),
    )
    .min(1),
});

export const UpdateRoleSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  permissions: z
    .array(
      z.object({
        id: z.number().min(1),
        name: z.string(),
      }),
    )
    .min(1),
  add_permissions: z
    .array(
      z.object({
        id: z.number().min(1),
        name: z.string(),
      }),
    )
    .min(1),
  remove_permission_ids: z.array(z.number()).min(1),
});
