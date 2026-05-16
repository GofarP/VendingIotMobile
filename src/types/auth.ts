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
  _hasHydrated:boolean;
  setHasHydrated: (state: boolean) => void;
  loginAction: (data: AuthData) => void;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}