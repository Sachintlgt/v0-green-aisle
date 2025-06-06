import { AuthContextType } from "@/contexts/auth-context";

export type userSignUpParams = { signUp: AuthContextType['signUp'], email: string, password: string, userType: 'couple'| 'vendor', name: string, location: string}