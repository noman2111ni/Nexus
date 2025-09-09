// Roles
export type UserRole = "entrepreneur" | "investor";

// Base User
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  bio?: string;
  isOnline?: boolean;
  createdAt?: string;
}

// Entrepreneur extends User
export interface Entrepreneur extends User {
  role: "entrepreneur";
  startupName: string;
  pitchSummary: string;
  fundingNeeded: string;
  industry: string;
  location: string;
  foundedYear: number;
  teamSize: number;
}

// Investor extends User
export interface Investor extends User {
  role: "investor";
  investmentInterests: string[];
  investmentStage: string[];
  portfolioCompanies: string[];
  totalInvestments: number;
  minimumInvestment: string;
  maximumInvestment: string;
}

// Chat
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface ChatConversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  updatedAt: string;
}

// Collaboration Requests
export interface CollaborationRequest {
  id: string;
  investorId: string;
  entrepreneurId: string;
  message: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

// Documents
export interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  lastModified: string;
  shared: boolean;
  url: string;
  ownerId: string;
}

// Auth Context
export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  updateProfile: (userId: string, updates: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Calendar System
export interface AvailabilitySlot {
  id: string;
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  entrepreneurId: string;
  investorId: string;
  status: "pending" | "accepted" | "declined";
}

// types.ts
export interface Transaction {
  [x: string]: string | number | Date;
  id: string;
  type: "deposit" | "withdraw" | "transfer" | "funding";
  amount: number;
  sender: UserRole | "system";
  receiver: UserRole | "system";
  status: "success" | "failed";
}

