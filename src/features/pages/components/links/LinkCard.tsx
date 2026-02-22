import { Card, CardBody, Chip } from "@nextui-org/react";
import React from "react";
import { FaSpotify, FaLink, FaGripVertical } from "react-icons/fa";
import { SiApplemusic } from "react-icons/si";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "../../../../components/Button/Button";
import { Link } from "../../../../data/entities/pages/Link";
import { LinkType } from "../../../../data/entities/pages/LinkType";
import { StreamPlatform } from "../../../../data/entities/pages/StreamPlatform";

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
            <p className="font-semibold text-sm truncate">{link.title}</p>
            {link.url && <p className="text-xs text-default-400 truncate">{link.url}</p>}
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
