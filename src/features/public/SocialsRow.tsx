import { FaInstagram, FaTiktok, FaSpotify, FaYoutube } from 'react-icons/fa';
import { SiApplemusic, SiSoundcloud } from 'react-icons/si';
import { SocialLinks } from '../../data/repo/userProfile/UserProfileRepo';

interface SocialsRowProps {
  socials: SocialLinks;
}

const SOCIAL_ICONS = [
  { key: 'instagram' as keyof SocialLinks, icon: FaInstagram, label: 'Instagram', color: '#E1306C' },
  { key: 'tikTok'    as keyof SocialLinks, icon: FaTiktok,    label: 'TikTok',    color: '#010101' },
  { key: 'spotify'   as keyof SocialLinks, icon: FaSpotify,   label: 'Spotify',   color: '#1DB954' },
  { key: 'appleMusic'as keyof SocialLinks, icon: SiApplemusic,label: 'Apple Music',color: '#fc3c44' },
  { key: 'youtube'   as keyof SocialLinks, icon: FaYoutube,   label: 'YouTube',   color: '#FF0000' },
  { key: 'soundCloud'as keyof SocialLinks, icon: SiSoundcloud, label: 'SoundCloud', color: '#FF5500' },
];

export const SocialsRow = ({ socials }: SocialsRowProps) => {
  const active = SOCIAL_ICONS.filter(({ key }) => socials[key]);
  if (active.length === 0) return null;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', padding: '0.5rem 0' }}>
      {active.map(({ key, icon: Icon, label, color }) => (
        <a
          key={key}
          href={socials[key]!}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          style={{ color, lineHeight: 1 }}
        >
          <Icon size={24} />
        </a>
      ))}
    </div>
  );
};

export default SocialsRow;
