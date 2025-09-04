import { API_KEY, API_URL } from "./apiFeedback";
import { errorMessage } from "../utils/helpers";
import { AuthSession, SessionSB, UserSB } from "../types/supabaseAuth.types";
import { LoginUserCredentials, UserProfile } from "../types/user.types";
import { MutationResult } from "../types/mutation.types";

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  isSessionActive: boolean;
  userId: string;
}

export const AUTH_API_URL: string = import.meta.env.VITE_SUPABASE_AUTH_URL;

//API Auth fetch wrapper
export async function fetchWrapperSBAuth<T>(
  api_url: string,
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  headers: HeadersInit,
  body?: BodyInit
): Promise<T> {
  const reqMethod = method === "GET" ? undefined : method;

  try {
    const res = await fetch(`${api_url}${endpoint}`, {
      method: reqMethod,
      headers,
      body,
    });

    //If HTTP errors
    if (!res.ok) {
      //if(res.status === 400 | 401 etc) set cachedSession to null,
      const error = await res.json();
      const errorMsg = error.details || error.message || error.msg;

      throw new Error(errorMsg);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    const errorMsg = errorMessage(error);
    console.log("api call error fetchWrapperSBAuth", errorMsg);
    throw errorMsg;
  }
}

//Get store auth token from localStorage
export function getStoredAuthTokens(): AuthTokens | null {
  const tokensRaw = localStorage.getItem("auth_session");

  if (!tokensRaw) return null;

  try {
    const { access_token, refresh_token, expires_at, user } =
      JSON.parse(tokensRaw);
    const currentTime = Date.now();
    const isSessionActive = currentTime < expires_at * 1000;

    return {
      accessToken: access_token,
      refreshToken: refresh_token,
      isSessionActive,
      expiresAt: expires_at,
      userId: user.id,
    };
  } catch {
    return null;
  }
}

//Authenticate user
export async function authenticateUser(
  accessToken: string,
  credentials: LoginUserCredentials
): Promise<
  MutationResult<{
    accessToken: string;
    id: string;
    userData: { accessToken: string; userProfile: UserProfile | null } | null;
  }>
> {
  const userCredentialsJSON = JSON.stringify(credentials);

  try {
    const authenticatedUser = await fetchWrapperSBAuth<SessionSB>(
      AUTH_API_URL,
      "/token?grant_type=password",
      "POST",
      {
        apikey: accessToken,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      userCredentialsJSON
    );

    saveUserLocalStorage(authenticatedUser);

    return {
      success: true,
      payload: {
        accessToken: authenticatedUser.access_token,
        id: authenticatedUser.user.id,
        userData: null,
      },
    };
  } catch (err) {
    return { success: false, error: err };
  }
}

//refresh session
export async function refreshSession(
  refresh_token: string
): Promise<SessionSB> {
  const refreshTokenJSON = JSON.stringify({ refresh_token });

  const res = await fetchWrapperSBAuth<SessionSB>(
    AUTH_API_URL,
    "/token?grant_type=refresh_token",
    "POST",
    {
      apikey: API_KEY,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    refreshTokenJSON
  );

  return res;
}

//save logged in user in Local Storage
export function saveUserLocalStorage(userData: SessionSB) {
  const {
    access_token,
    refresh_token,
    expires_at,
    expires_in,
    user: { id, email, role, created_at },
  } = userData;

  const auth_session: AuthSession = {
    access_token,
    refresh_token,
    expires_at,
    expires_in,
    user: { id, email, role, created_at },
  };

  localStorage.setItem("auth_session", JSON.stringify(auth_session));
}

//fetch current user
export async function fetchUser(access_token: string) {
  const currentUser = fetchWrapperSBAuth<UserSB>(AUTH_API_URL, "/user", "GET", {
    apikey: API_KEY,
    Authorization: `Bearer ${access_token}`,
    Accept: "application/json",
  });

  return currentUser;
}

//get user profile info
export async function getUserProfileInfo(access_token: string) {
  try {
    const userProfile = await fetchWrapperSBAuth<UserProfile>(
      API_URL,
      "/userProfiles",
      "GET",
      {
        apikey: API_KEY,
        Authorization: `Bearer ${access_token}`,
        Accept: "application/vnd.pgrst.object+json",
      }
    );

    return userProfile;
  } catch (err) {
    if (err === "The result contains 0 rows") {
      return null;
    } else {
      console.error("User profile error ", err);
    }
  }

  return null;
}

//authorize authenticated user
export async function authorizeUser(access_token: string): Promise<UserSB> {
  const fetchedUser = await fetchUser(access_token);

  return fetchedUser;
}

//Improve child loaders efficiency by retrieving access_token from in-memory cache (lives in a module-scoped variabled - preserved accross function calls )
interface CachedSession {
  accessToken: string;
  expiresAtMs: number; //store val in ms
  userId: string;
}

let cachedSession: CachedSession | null = null;

export function clearCachedSession() {
  localStorage.removeItem("auth_session");
  cachedSession = null;
}

export async function ensureValidSession(): Promise<CachedSession | null> {
  //1. check if data is available in cachedAcessToken, return it if available
  const now = Date.now(); //in ms
  const timeBuffer = 60000; //ms

  if (cachedSession && now < cachedSession.expiresAtMs - timeBuffer) {
    return cachedSession;
  }

  //2. if not, check localStorage
  const tokens = getStoredAuthTokens();

  //3. if localStorage, empty, return null
  if (!tokens) return null;

  const { accessToken, refreshToken, expiresAt, userId } = tokens;
  const expiresAtMs = expiresAt * 1000;

  const isExpired = now > expiresAtMs - timeBuffer;

  //4. if localStorage has access_token, and if not expired, store in cachedSession and return cachedSession
  if (!isExpired) {
    cachedSession = { accessToken, expiresAtMs, userId };
    return cachedSession;
  }

  //5. if session expired, refresh session, update cache
  try {
    const session = await refreshSession(refreshToken);
    saveUserLocalStorage(session);

    cachedSession = {
      accessToken: session.access_token,
      expiresAtMs: session.expires_at ?? 0,
      userId: session.user.id,
    };

    return cachedSession;
  } catch (err) {
    console.error("Session refresh failed:", err);
    cachedSession = null;
    return null;
  }
}
