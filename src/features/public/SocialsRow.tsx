import { FaInstagram, FaTiktok, FaSpotify, FaYoutube } from 'react-icons/fa';
import { SiApplemusic, SiSoundcloud } from 'react-icons/si';

// socials is a { key: url } map in display order (object insertion order is preserved)
interface SocialsRowProps {
  socials: Record<string, string>;
  mono?: boolean;
}

const PLATFORM_META: Record<string, { icon: React.ComponentType<{ size?: number }>; label: string; color: string }> = {
  instagram:  { icon: FaInstagram,  label: 'Instagram',   color: '#E1306C' },
  tikTok:     { icon: FaTiktok,     label: 'TikTok',      color: '#010101' },
  spotify:    { icon: FaSpotify,    label: 'Spotify',     color: '#1DB954' },
  appleMusic: { icon: SiApplemusic, label: 'Apple Music', color: '#fc3c44' },
  youtube:    { icon: FaYoutube,    label: 'YouTube',     color: '#FF0000' },
  soundCloud: { icon: SiSoundcloud, label: 'SoundCloud',  color: '#FF5500' },
};

export const SocialsRow = ({ socials, mono = false }: SocialsRowProps) => {
  const entries = Object.entries(socials).filter(([, url]) => !!url);
  if (entries.length === 0) return null;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', padding: '0.5rem 0' }}>
      {entries.map(([key, url]) => {
        const meta = PLATFORM_META[key];
        if (!meta) return null;
        const Icon = meta.icon;
        return (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={meta.label}
            style={{ color: mono ? '#111111' : meta.color, lineHeight: 1 }}
          >
            <Icon size={24} />
          </a>
        );
      })}
    </div>
  );
};

export default SocialsRow;
