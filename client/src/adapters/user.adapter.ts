import { User } from "@/models/user.model";

export interface UserEndpoint {
  id: string;
  username: string;
  created_at: Date;
  email: string | null;
}

export const createUserAdapter = (user: UserEndpoint): User => ({
  id: user.id,
  username: user.username,
  createdAt: user.created_at,
  email: user.email,
});
