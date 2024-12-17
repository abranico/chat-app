import { User } from "./user.model";

export interface Message {
  id: string;
  content: string;
  sentBy: User;
  roomId: string;
  createdAt: Date;
}
