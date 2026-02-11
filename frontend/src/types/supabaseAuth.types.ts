/* eslint-disable @typescript-eslint/no-explicit-any */

//User types
export interface UserAppMetadataSB {
  provider?: string;
  [key: string]: any;
}

export interface UserIdentitySB {
  id: string;
  user_id: string;
  identity_data?: {
    [key: string]: any;
  };
  identity_id: string;
  provider: string;
  created_at?: string;
  last_sign_in_at?: string;
  updated_at?: string;
}

export interface FactorSB {
  id: string;
  friendly_name?: string;
  factor_type: "totp" | "phone" | (string & {});
  status: "verified" | "unverified";
  created_at: string;
  updated_at: string;
}

export interface UserSB {
  id: string;
  app_metadata: UserAppMetadataSB;
  user_metadata: { [key: string]: any };
  aud: string;
  confirmation_sent_at?: string;
  recovery_sent_at?: string;
  email_change_sent_at?: string;
  new_email?: string;
  new_phone?: string;
  invited_at?: string;
  action_link?: string;
  email?: string;
  phone?: string;
  created_at: string;
  confirmed_at?: string;
  email_confirmed_at?: string;
  phone_confirmed_at?: string;
  last_sign_in_at?: string;
  role?: string;
  updated_at?: string;
  identities?: UserIdentitySB[];
  is_anonymous?: boolean;
  is_sso_user?: boolean;
  factors?: FactorSB[];
  deleted_at?: string;
}

//Session types
export interface SessionSB {
  provider_token?: string | null;
  provider_refresh_token?: string | null;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at?: number;
  token_type: string;
  user: UserSB;
}

//Error type
export interface AuthErrorSB {
  name: string;
  message: string;
  status?: number;
  code?: string;
}

//Session data saved in Local Storage
export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_at: number | undefined;
  expires_in: number;
  user: {
    id: string;
    email: string | undefined;
    role: string | undefined;
    created_at: string;
  };
}
