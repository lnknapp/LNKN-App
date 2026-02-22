import { useEffect, useState } from 'react';
import { useFormikContext } from 'formik';
import { Card, CardBody, Switch } from '@nextui-org/react';
import { FaInstagram, FaTiktok, FaSpotify, FaYoutube, FaGripVertical } from 'react-icons/fa';
import { SiApplemusic, SiSoundcloud } from 'react-icons/si';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { UserProfileService } from '../../../services/userProfile/UserProfileService';
import { SocialLinks } from '../../../data/repo/userProfile/UserProfileRepo';

const profileService = new UserProfileService();

interface SocialConfig {
  key: keyof SocialLinks;
  enabled: boolean;
}

const ALL_PLATFORMS: {
  key: keyof SocialLinks;
  label: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
}[] = [
  { key: 'instagram',  label: 'Instagram',   icon: <FaInstagram size={20} />,  color: '#E1306C', bg: '#E1306C22' },
  { key: 'tikTok',     label: 'TikTok',      icon: <FaTiktok size={20} />,     color: '#010101', bg: '#01010122' },
  { key: 'spotify',    label: 'Spotify',     icon: <FaSpotify size={20} />,    color: '#1DB954', bg: '#1DB95422' },
  { key: 'appleMusic', label: 'Apple Music', icon: <SiApplemusic size={20} />, color: '#fc3c44', bg: '#fc3c4422' },
  { key: 'youtube',    label: 'YouTube',     icon: <FaYoutube size={20} />,    color: '#FF0000', bg: '#FF000022' },
  { key: 'soundCloud', label: 'SoundCloud',  icon: <SiSoundcloud size={20} />, color: '#FF5500', bg: '#FF550022' },
];

const DEFAULT_CONFIG: SocialConfig[] = ALL_PLATFORMS.map(({ key }) => ({ key, enabled: false }));

// ── Individual sortable row ───────────────────────────────────────────────────

interface SocialRowProps {
  config: SocialConfig;
  hasUrl: boolean;
  onToggle: (key: keyof SocialLinks, enabled: boolean) => void;
}

const SocialRow: React.FC<SocialRowProps> = ({ config, hasUrl, onToggle }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: config.key });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : undefined,
  };

  const platform = ALL_PLATFORMS.find((p) => p.key === config.key)!;

  return (
    <div ref={setNodeRef} style={style}>
      <Card className={`border ${config.enabled && hasUrl ? 'border-primary/40' : 'border-default-200'}`}>
        <CardBody className="flex flex-row items-center gap-3 p-3">
          {/* Drag handle */}
          <div
            {...attributes}
            {...listeners}
            className="text-default-300 cursor-grab active:cursor-grabbing shrink-0 touch-none"
          >
            <FaGripVertical size={16} />
          </div>

          {/* Platform icon */}
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: hasUrl ? platform.bg : '#f4f4f540' }}
          >
            <span style={{ color: hasUrl ? platform.color : '#aaa' }}>{platform.icon}</span>
          </div>

          {/* Label */}
          <div className="flex-1 min-w-0">
            <p className={`font-semibold text-sm ${!hasUrl ? 'text-default-300' : ''}`}>
              {platform.label}
            </p>
            {!hasUrl && (
              <p className="text-xs text-default-300">
                Add URL in Profile Settings to enable
              </p>
            )}
          </div>

          {/* Toggle */}
          <Switch
            isSelected={config.enabled && hasUrl}
            isDisabled={!hasUrl}
            onValueChange={(val) => onToggle(config.key, val)}
            size="sm"
            className="shrink-0"
          />
        </CardBody>
      </Card>
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────

interface FormValues {
  theme: string;
}

export const PageSocials = () => {
  const { values, setFieldValue } = useFormikContext<FormValues>();
  const [userSocials, setUserSocials] = useState<SocialLinks>({});

  const theme = (() => { try { return JSON.parse(values.theme); } catch { return {}; } })();

  // Merge saved config with defaults (in case new platforms are added later)
  const savedConfig: SocialConfig[] = theme.socialsConfig ?? DEFAULT_CONFIG;
  const config: SocialConfig[] = ALL_PLATFORMS.map(({ key }) => {
    const saved = savedConfig.find((c) => c.key === key);
    return saved ?? { key, enabled: false };
  });

  useEffect(() => {
    profileService.getMe().then((profile) => {
      setUserSocials(profileService.parseSocials(profile));
    }).catch(() => {});
  }, []);

  const save = (next: SocialConfig[]) => {
    setFieldValue('theme', JSON.stringify({ ...theme, socialsConfig: next }));
  };

  const handleToggle = (key: keyof SocialLinks, enabled: boolean) => {
    save(config.map((c) => (c.key === key ? { ...c, enabled } : c)));
  };

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = config.findIndex((c) => c.key === active.id);
    const newIdx = config.findIndex((c) => c.key === over.id);
    save(arrayMove(config, oldIdx, newIdx));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-bold text-primary">Socials</span>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={config.map((c) => c.key)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {config.map((c) => (
              <SocialRow
                key={c.key}
                config={c}
                hasUrl={!!userSocials[c.key]}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default PageSocials;
