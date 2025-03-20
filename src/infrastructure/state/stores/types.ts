export interface User {
  id:       string;
  role:     Role;
  name:     string;
  email:    string;
  status:   Status;
}

export interface AuthState {
  user:           User | null;
  token:          string | null;
  isSignedIn:     boolean;
  isLoading:      boolean;
  login:          (user: User, token: string) => void;
  logout:         () => void;
  setLoading:     (isLoading: boolean) => void;
}

export type Role = "user" | "admin";
export type Status = "active" | "inactive";
