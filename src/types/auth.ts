export interface AuthData {
  token: string;
  refreshToken: string;
  email: string;
  fullName: string;
  photoUrl: string | null;
  roles: string[];
  permissions: string[];
  expiresIn: number;
}

export interface AuthState {
  auth: AuthData | null;
  isAuthenticated: boolean;
  loginAction: (data: AuthData) => void;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}