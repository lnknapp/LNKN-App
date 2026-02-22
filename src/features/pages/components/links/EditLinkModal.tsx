import {
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Chip,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Button } from "../../../../components/Button/Button";
import { Link } from "../../../../data/entities/pages/Link";
import { LinkType } from "../../../../data/entities/pages/LinkType";
import { StreamPlatform } from "../../../../data/entities/pages/StreamPlatform";
import { LinkService } from "../../../../services/pages/LinkService";
import { usePageDetails } from "../PageDetailsContext";

interface EditLinkModalProps {
  link: Link | null;
  isOpen: boolean;
  onClose: () => void;
}

const linkService = new LinkService();

const PLATFORM_LABELS: Record<string, string> = {
  [StreamPlatform.spotify]: "Spotify",
  [StreamPlatform.appleMusic]: "Apple Music",
};

export const EditLinkModal: React.FC<EditLinkModalProps> = ({ link, isOpen, onClose }) => {
  const { page, updatePageKey } = usePageDetails();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [position, setPosition] = useState("1");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (link) {
      setTitle(link.title);
      setUrl(link.url ?? "");
      setPosition(String(link.position));
    }
  }, [link]);

  const parsedTheme = link?.theme
    ? (typeof link.theme === "string" ? JSON.parse(link.theme) : link.theme as any)
    : {};
  const platformLabel = link?.type === LinkType.stream
    ? PLATFORM_LABELS[parsedTheme?.platform] ?? null
    : null;

  const handleSave = async () => {
    if (!link) return;
    setIsLoading(true);
    try {
      const existingTheme = typeof link.theme === "string" ? link.theme : JSON.stringify(link.theme ?? {});
      const updated = { ...link, title, url: url || null, position: parseInt(position, 10), theme: existingTheme as any };
      const result = await linkService.update(link.id, updated);
      const newLinks = (page.links ?? []).map((l) => l.id === link.id ? result : l);
      updatePageKey("links", newLinks);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalContent>
        <ModalHeader>Edit Button</ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-3">
            {platformLabel && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-default-500">Platform:</span>
                <Chip size="sm" variant="flat">{platformLabel}</Chip>
              </div>
            )}
            <Input
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              variant="bordered"
            />
            <Input
              label="URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              variant="bordered"
            />
            <Input
              label="Position"
              type="number"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              variant="bordered"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onClick={onClose}>Cancel</Button>
          <Button isLoading={isLoading} onClick={handleSave} color="primary">Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
