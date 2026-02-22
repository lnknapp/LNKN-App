import { useEffect, useState } from 'react';
import { Divider, Input, Button } from '@nextui-org/react';
import { FaInstagram, FaTiktok, FaSpotify, FaYoutube } from 'react-icons/fa';
import { SiApplemusic, SiSoundcloud } from 'react-icons/si';
import { UserProfileService } from '../../services/userProfile/UserProfileService';
import { SocialLinks } from '../../data/repo/userProfile/UserProfileRepo';
import { showSuccessMessage, showErrorMessage } from '../../utils';

const profileService = new UserProfileService();

const SOCIAL_FIELDS: { key: keyof SocialLinks; label: string; placeholder: string; icon: React.ReactNode }[] = [
  { key: 'instagram',  label: 'Instagram',   placeholder: 'https://instagram.com/yourhandle', icon: <FaInstagram size={18} /> },
  { key: 'tikTok',     label: 'TikTok',      placeholder: 'https://tiktok.com/@yourhandle',   icon: <FaTiktok size={18} /> },
  { key: 'spotify',    label: 'Spotify',     placeholder: 'https://open.spotify.com/artist/…',icon: <FaSpotify size={18} /> },
  { key: 'appleMusic', label: 'Apple Music', placeholder: 'https://music.apple.com/…',        icon: <SiApplemusic size={18} /> },
  { key: 'youtube',    label: 'YouTube',     placeholder: 'https://youtube.com/@yourchannel', icon: <FaYoutube size={18} /> },
  { key: 'soundCloud', label: 'SoundCloud',  placeholder: 'https://soundcloud.com/yourname',  icon: <SiSoundcloud size={18} /> },
];

export function ProfileSettingsPage() {
  const [socials, setSocials] = useState<SocialLinks>({});
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    profileService.getMe().then((profile) => {
      setSocials(profileService.parseSocials(profile));
      setLoaded(true);
    }).catch(() => setLoaded(true));
  }, []);

  const handleChange = (key: keyof SocialLinks, value: string) => {
    setSocials(prev => ({ ...prev, [key]: value || undefined }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await profileService.saveSocials(socials);
      showSuccessMessage('Profile saved.');
    } catch {
      showErrorMessage('Failed to save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="py-6 space-y-6">
      <div>
        <h2 className="text-lg font-bold">Profile</h2>
        <p className="text-gray-500 text-md">Update your personal information and profile details.</p>
      </div>
      <Divider />

      <div className="space-y-6">
        <div>
          <p className="text-sm font-semibold text-default-600 uppercase tracking-wider mb-3">Social Links</p>
          <p className="text-sm text-default-400 mb-4">
            Add your social media profile links. These will appear as icons on your public page.
          </p>
          <div className="space-y-3">
            {SOCIAL_FIELDS.map(({ key, label, placeholder, icon }) => (
              <Input
                key={key}
                label={label}
                placeholder={placeholder}
                value={socials[key] ?? ''}
                onChange={(e) => handleChange(key, e.target.value)}
                variant="bordered"
                startContent={<span className="text-default-400">{icon}</span>}
                isDisabled={!loaded}
                type="url"
              />
            ))}
          </div>
        </div>

        <Button
          color="primary"
          onPress={handleSave}
          isLoading={saving}
          isDisabled={!loaded}
        >
          Save Profile
        </Button>
      </div>
    </section>
  );
}

export default ProfileSettingsPage;
