import { UserProfileRepo, UserProfile, SocialLinks } from '../../data/repo/userProfile/UserProfileRepo';

export class UserProfileService {
  private repo = new UserProfileRepo();

  async getPublicByUsername(username: string): Promise<UserProfile | null> {
    return this.repo.getPublicByUsername(username);
  }

  async getMe(): Promise<UserProfile | null> {
    return this.repo.getMe();
  }

  parseSocials(profile: UserProfile | null | undefined): SocialLinks {
    if (!profile?.socials) return {};
    try { return JSON.parse(profile.socials); } catch { return {}; }
  }

  async saveSocials(socials: SocialLinks): Promise<UserProfile | null> {
    const existing = await this.repo.getMe();
    return this.repo.updateMe({
      ...(existing ?? {}),
      socials: JSON.stringify(socials),
    });
  }
}

export default UserProfileService;
