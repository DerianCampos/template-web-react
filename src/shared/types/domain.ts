/** Core domain types shared across features */

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  role: "admin" | "viewer";
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
