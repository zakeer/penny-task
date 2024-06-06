import { AuthState } from "../../auth/auth.reducer";
import { UserState } from "../../profile/profile.reducer";

export interface AppState {
  auth: AuthState;
  user: UserState;
}
