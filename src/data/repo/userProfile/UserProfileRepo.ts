import BaseRepository from '../BaseRepository';

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
  userId?: number;
  socials?: string | null; // JSON string
}

export class UserProfileRepo extends BaseRepository {
  private readonly baseUrl = 'userprofile';

  async getPublicByUsername(username: string): Promise<UserProfile | null> {
    const response = await this.client.get(`${this.baseUrl}/public/${username}`);
    return this.handleResponse<UserProfile>(response, false, false);
  }

  async getMe(): Promise<UserProfile | null> {
    const response = await this.client.get(`${this.baseUrl}/me`);
    return this.handleResponse<UserProfile>(response, false, false);
  }

  async updateMe(profile: UserProfile): Promise<UserProfile | null> {
    const response = await this.client.put(`${this.baseUrl}/me`, profile);
    return this.handleResponse<UserProfile>(response);
  }
}

export default UserProfileRepo;
