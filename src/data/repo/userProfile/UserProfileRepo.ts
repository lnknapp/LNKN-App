import { supabase } from '../../../lib/supabase';

export interface SocialLinks {
  instagram?: string;
  tikTok?: string;
  spotify?: string;
  appleMusic?: string;
  youtube?: string;
  soundCloud?: string;
}

export interface UserProfile {
  id?: number;
  userId?: string;  // Supabase UUID
  username?: string;
  socials?: string | null;  // JSON string
}

export class UserProfileRepo {
  async getPublicByUsername(username: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('username', username)
      .single();
    if (error || !data) return null;
    return { id: data.id, userId: data.user_id, username: data.username, socials: data.socials };
  }

  async getMe(): Promise<UserProfile | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();
    if (error || !data) return null;
    return { id: data.id, userId: data.user_id, username: data.username, socials: data.socials };
  }

  async updateMe(profile: UserProfile): Promise<UserProfile | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    const { data, error } = await supabase
      .from('user_profiles')
      .update({ socials: profile.socials, updated_at: new Date().toISOString() })
      .eq('user_id', user.id)
      .select()
      .single();
    if (error) throw error;
    return { id: data.id, userId: data.user_id, username: data.username, socials: data.socials };
  }
}

export default UserProfileRepo;
