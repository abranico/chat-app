import { Message } from "@/models/message.model";
import { createUserAdapter, UserEndpoint } from "./user.adapter";

export interface MessageEndpoint {
  id: string;
  content: string;
  sent_by: UserEndpoint;
  room_id: string;
  created_at: Date;
}

export const createMessageAdapter = (message: MessageEndpoint): Message => ({
  id: message.id,
  content: message.content,
  sentBy: createUserAdapter(message.sent_by),
  roomId: message.room_id,
  createdAt: message.created_at,
});
