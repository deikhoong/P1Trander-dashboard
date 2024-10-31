// Interface for the login form
export interface LoginForm {
  email: string;
  password: string;
}

// Type for the login response, containing user details and tokens
export type LoginResponse = {
  data: {
    user: UserListItem;
    access_token: string;
    refresh_token: string;
  }
}

// Pagination type for handling paginated requests
export type Pagination = {
  page: number;
  take: number;
}

// Type for individual users in a user list
export type UserListItem = {
  id?: string;
  email?: string;
  role?: UserRole;
  nickname?: string;
  tradingViewEmail?: string;
  discordId?: string;
}

// User information for updating or displaying user details
export type UserInfo = {
  email?: string;
  nickname?: string;
  tradingViewEmail?: string;
  discordId?: string;
  countryCode?: string;
  tel?: string;
}

// Request type for creating a new user
export type CreateUserRequest = {
  email: string;
  password: string;
  nickname: string;
  role: UserRole;
}

// Request type for updating an existing user's information
export type UpdateUserRequest = {
  nickname: string;
  tradingViewEmail?: string;
  discordId?: string;
  countryCode?: string;
  tel?: string;
}

// Enum for defining user roles
export enum UserRole {
  Admin = 'Admin',
  Member = 'Member',
}

export type EventListItem = {
  id: string;
  cover: {
    id: string;
    url: string;
  };
  title: string;
  type: EventType;
  location: EventLocation;
  startDate: string;
};

export type EventInfo = {
  cover: {
    id: string;
    url: string;
  };
  title: string;
  type: EventType;
  location: EventLocation;
  startDate: string;
  content: string;
  speaker: string;
  speakerDescription: string;
  speakerAvatar: {
    id: string;
    url: string;
  };
  views: number;
}

export type CreateEventRequest = {
  coverId: string;
  title: string;
  type: EventType;
  location: EventLocation;
  startDate: string;
  content: string;
  speaker: string;
  speakerDescription: string;
  speakerAvatarId: string;
}

export enum EventType {
  WEBINAR = 'Webinar',
  AMA = 'AMA Session',
}

export enum EventLocation {
  ONLINE = 'Online',
  TAIPEI = 'Taipei',
}