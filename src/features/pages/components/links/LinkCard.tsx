import { Card, CardBody, Chip } from "@nextui-org/react";
import React from "react";
import { FaSpotify, FaLink, FaGripVertical, FaShareAlt, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { SiApplemusic, SiSoundcloud } from "react-icons/si";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "../../../../components/Button/Button";
import { Link } from "../../../../data/entities/pages/Link";
import { LinkType } from "../../../../data/entities/pages/LinkType";
import { StreamPlatform } from "../../../../data/entities/pages/StreamPlatform";

const SOCIAL_META: Record<string, { Icon: React.ComponentType<{ size?: number; color?: string }>; color: string }> = {
  instagram:  { Icon: FaInstagram,  color: "#E1306C" },
  tikTok:     { Icon: FaTiktok,     color: "#010101" },
  spotify:    { Icon: FaSpotify,    color: "#1DB954" },
  appleMusic: { Icon: SiApplemusic, color: "#fc3c44" },
  youtube:    { Icon: FaYoutube,    color: "#FF0000" },
  soundCloud: { Icon: SiSoundcloud, color: "#FF5500" },
};

const SOCIAL_CANONICAL_ORDER = ['instagram', 'tikTok', 'spotify', 'appleMusic', 'youtube', 'soundCloud'];

interface LinkCardProps {
  link: Link;
  onEdit: (link: Link) => void;
  onDelete: (id: number) => void;
}

const getPlatformIcon = (link: Link) => {
  if (link.type === LinkType.stream) {
    const theme = link.theme
      ? (typeof link.theme === "string" ? JSON.parse(link.theme) : link.theme as any)
      : {};
    if (theme.platform === StreamPlatform.spotify) {
      return (
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#1DB95422" }}>
          <FaSpotify color="#1DB954" size={22} />
        </div>
      );
    }
    if (theme.platform === StreamPlatform.appleMusic) {
      return (
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#fc3c4422" }}>
          <SiApplemusic color="#fc3c44" size={22} />
        </div>
      );
    }
  }
  if (link.type === LinkType.socials) {
    return (
      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-default-100">
        <FaShareAlt className="text-default-500" size={18} />
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary-100">
      <FaLink className="text-primary" size={18} />
    </div>
  );
};

export const LinkCard: React.FC<LinkCardProps> = ({ link, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: link.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card className="border border-default-200">
        <CardBody className="flex flex-row items-center gap-3 p-3">
          <div
            {...attributes}
            {...listeners}
            className="text-default-300 cursor-grab active:cursor-grabbing shrink-0 touch-none"
          >
            <FaGripVertical size={16} />
          </div>
          {getPlatformIcon(link)}
          <div className="flex-1 min-w-0">
            {link.type === LinkType.socials ? (() => {
              const theme = link.theme ? (typeof link.theme === "string" ? JSON.parse(link.theme) : link.theme as any) : {};
              const enabledSet = new Set<string>(theme.enabledSocials ?? []);
              const iconMono: boolean = theme.iconMono ?? false;
              const ordered = SOCIAL_CANONICAL_ORDER.filter((key) => enabledSet.has(key));
              return (
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-sm">Social Row</p>
                  <div className="flex items-center gap-2">
                    {ordered.length === 0
                      ? <span className="text-xs text-default-400">No socials selected</span>
                      : ordered.map((key) => {
                          const meta = SOCIAL_META[key];
                          if (!meta) return null;
                          const { Icon, color } = meta;
                          return <span key={key} style={{ color: iconMono ? '#444444' : color }}><Icon size={14} /></span>;
                        })
                    }
                  </div>
                </div>
              );
            })() : (
              <>
                <p className="font-semibold text-sm truncate">{link.title}</p>
                {link.url && <p className="text-xs text-default-400 truncate">{link.url}</p>}
              </>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Chip size="sm" variant="flat" color="default">#{link.position}</Chip>
            <Button size="sm" variant="light" onClick={() => onEdit(link)}>Edit</Button>
            <Button size="sm" variant="ghost" color="danger" onClick={() => onDelete(link.id)}>Delete</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
