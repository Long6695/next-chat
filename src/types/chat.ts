export interface RoomType {
    id: string;
    name: string;
    last_message: string;
    participant_ids: string;
    created_at: string;
}

export interface UserType {
    id: string;
    username: string;
    phone: string;
    created_at: string
}

export interface RoomsType {
    room: RoomType;
    users: UserType[];
}

export interface MessageType {
    content: string;
    created_at: string;
    id: string;
    room_id: string;
    user_id: string;
}