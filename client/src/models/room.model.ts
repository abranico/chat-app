import { Message } from "./message.model";
import { User } from "./user.model";

export interface Room {
  id: string;
  name: string;
  roomCode: string;
  roomType: RoomType;
  lastMessage: Message | null;
  createdBy: User;
  createdAt: Date;
  members: User[];
}

export enum RoomType {
  Public = "public",
  Private = "private",
}
