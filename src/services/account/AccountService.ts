import { supabase } from '../../lib/supabase';
import { RegisterRequest } from '../../models';

export class AccountService {
  /**
   * Sign in with email or username + password.
   * If the input has no '@', we look up the email by username first.
   */
  async login(emailOrUsername: string, password: string): Promise<{ token: string; userId: string; email: string; username: string } | null> {
    let email = emailOrUsername;

    if (!emailOrUsername.includes('@')) {
      // Username-based login: look up email from user_profiles
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('email')
        .eq('username', emailOrUsername)
        .maybeSingle();
      if (!profile?.email) throw new Error('Username not found');
      email = profile.email;
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    if (!data.session || !data.user) return null;

    // Fetch profile — upsert ensures it exists even if signup trigger never ran
    const username = data.user.user_metadata?.username ?? null;
    await supabase
      .from('user_profiles')
      .upsert({
        user_id: data.user.id,
        email: data.user.email,
        ...(username ? { username } : {}),
      }, { onConflict: 'user_id', ignoreDuplicates: true });

    const { data: profile } = await supabase
      .from('user_profiles')
      .select('username')
      .eq('user_id', data.user.id)
      .single();

    return {
      token: data.session.access_token,
      userId: data.user.id,
      email: data.user.email!,
      username: profile?.username ?? data.user.email!,
    };
  }

  async register(request: RegisterRequest): Promise<boolean> {
    const { data, error } = await supabase.auth.signUp({
      email: request.email,
      password: request.password,
    });
    if (error) throw error;
    if (!data.user) return false;

    // Insert the profile row directly — no trigger needed.
    // signUp returns an active session when email confirmation is disabled.
    await supabase
      .from('user_profiles')
      .upsert({
        user_id: data.user.id,
        username: request.userName,
        email: request.email,
      }, { onConflict: 'user_id' });

    return true;
  }

  async forgotPassword(email: string): Promise<boolean> {
    const redirectTo = `${window.location.origin}/account/reset-password`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    if (error) throw error;
    return true;
  }

  /** Called after user lands on reset-password page (Supabase session is already set via URL hash) */
  async resetPassword(newPassword: string): Promise<boolean> {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
    return true;
  }

  async changePassword(newPassword: string): Promise<boolean> {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
    return true;
  }

  async checkUsernameExists(username: string): Promise<boolean> {
    const { data } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('username', username)
      .maybeSingle();
    return !!data;
  }

  /** Supabase handles username recovery via email — send the username to the registered email. */
  async forgotUsername(request: { email: string }): Promise<boolean> {
    // With Supabase, look up the username by email and surface it to the user.
    // For now, send a password reset email so the user can log in and find their username in settings.
    const { error } = await supabase.auth.resetPasswordForEmail(request.email, {
      redirectTo: `${window.location.origin}/account/login`,
    });
    if (error) throw error;
    return true;
  }

  async checkEmailExists(email: string): Promise<boolean> {
    const { data } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('email', email)
      .maybeSingle();
    return !!data;
  }
}

export default AccountService;
