import { supabase } from "@/lib/supabase";
import { userSignUpParams } from "@/types/auth";

export async function userSignUp({
  signUp,
  email,
  password,
  userType,
  name
}: userSignUpParams) {
  try {
    // 1. Create the user account with Supabase Auth
    const { error: signUpError } = await signUp(email, password, {
      full_name: name,
      user_type: userType,
    });

    if (signUpError) throw signUpError;

    // 2. Create the profile record
    const { error: profileError } = await supabase.from("profiles").insert({
      id: (await supabase.auth.getUser()).data.user?.id,
      full_name: name,
      user_type: userType,
      location: location || null,
    });
    if (profileError) throw profileError;
  } catch (error) {
    throw error;
  }
}
