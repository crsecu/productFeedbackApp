export interface LoginUserCredentials {
  email: string;
  password: string;
}

export interface UserProfileInput {
  name: string;
  username: string;
  authId: string;
}

export interface UserProfile extends UserProfileInput {
  id: number;
  image: string | null;
  upvotedFeedbackIds: number[] | null;
}

export interface UserIdentifierAvailability {
  emailTaken: boolean;
  usernameTaken: boolean;
}

export interface SignupConflictError {
  email: string | null;
  username: string | null;
}
