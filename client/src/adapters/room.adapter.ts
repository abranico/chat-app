import { Room, RoomType } from "@/models/room.model";
import { createUserAdapter, UserEndpoint } from "./user.adapter";
import { Message } from "@/models/message.model";

export interface RoomEndpoint {
  id: string;
  name: string;
  room_code: string;
  room_type: RoomType;
  last_message: Message | null;
  created_by: UserEndpoint;
  created_at: Date;
  members: UserEndpoint[];
}

export const createRoomAdapter = (room: RoomEndpoint): Room => ({
  id: room.id,
  name: room.name,
  roomCode: room.room_code,
  roomType: room.room_type,
  lastMessage: room.last_message,
  createdBy: createUserAdapter(room.created_by),
  createdAt: room.created_at,
  members: room.members.map(createUserAdapter),
});
