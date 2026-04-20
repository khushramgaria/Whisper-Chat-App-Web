export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface MessageSender {
  _id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Message {
  _id: string;
  chat: string;
  sender: MessageSender | string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatLastMessage {
  _id: string;
  text: string;
  sender: string;
  createdAt: string;
}

export interface Chat {
  _id: string;
  participant: MessageSender;
  lastMessage: ChatLastMessage | null;
  lastMessageAt: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean; // true while checking stored token on startup
  isSignedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}
