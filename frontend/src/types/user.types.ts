export interface LoginUserCredentials {
  email: string;
  password: string;
}

export interface NewUserProfile {
  name: string;
  username: string;
  authId: string;
}

export interface UserProfile extends NewUserProfile {
  id: number;
  image?: string;
}

export interface CurrentUser {
  name: string;
  image?: string;
  username: string;
}

export interface UserIdentifierAvailability {
  emailTaken: boolean;
  usernameTaken: boolean;
}

export interface SignupConflictError {
  email: string | null;
  username: string | null;
}
