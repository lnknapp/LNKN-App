import {
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input,
} from "@nextui-org/react";
import React, { useState } from "react";
import { FaSpotify, FaLink } from "react-icons/fa";
import { SiApplemusic } from "react-icons/si";
import { MdMusicNote } from "react-icons/md";
import { Button } from "../../../../components/Button/Button";
import { Link } from "../../../../data/entities/pages/Link";
import { LinkType } from "../../../../data/entities/pages/LinkType";
import { StreamPlatform } from "../../../../data/entities/pages/StreamPlatform";
import { LinkService } from "../../../../services/pages/LinkService";
import { usePageDetails } from "../PageDetailsContext";
import { LinkTypeCard } from "./LinkTypeCard";
import { StreamPlatformCard } from "./StreamPlatformCard";

interface AddLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "type" | "platform" | "configure";

const linkService = new LinkService();

const DEFAULT_TITLES: Record<string, string> = {
  [StreamPlatform.spotify]: "Listen on Spotify",
  [StreamPlatform.appleMusic]: "Listen on Apple Music",
};

const URL_PLACEHOLDERS: Record<string, string> = {
  [StreamPlatform.spotify]: "https://open.spotify.com/...",
  [StreamPlatform.appleMusic]: "https://music.apple.com/...",
  default: "https://",
};

export const AddLinkModal: React.FC<AddLinkModalProps> = ({ isOpen, onClose }) => {
  const { page, updatePageKey } = usePageDetails();
  const [step, setStep] = useState<Step>("type");
  const [selectedType, setSelectedType] = useState<LinkType>(LinkType.default);
  const [selectedPlatform, setSelectedPlatform] = useState<StreamPlatform | null>(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [position, setPosition] = useState(String((page.links?.length ?? 0) + 1));
  const [isLoading, setIsLoading] = useState(false);

  const resetState = () => {
    setStep("type");
    setSelectedType(LinkType.default);
    setSelectedPlatform(null);
    setTitle("");
    setUrl("");
    setPosition(String((page.links?.length ?? 0) + 1));
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleTypeSelect = (type: LinkType) => {
    setSelectedType(type);
    if (type === LinkType.stream) {
      setStep("platform");
    } else {
      setTitle("");
      setStep("configure");
    }
  };

  const handlePlatformSelect = (platform: StreamPlatform) => {
    setSelectedPlatform(platform);
    setTitle(DEFAULT_TITLES[platform] ?? "");
    setStep("configure");
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const themeObj = selectedPlatform ? { platform: selectedPlatform } : {};
      const newLink = {
        pageId: page.id,
        type: selectedType,
        title,
        url: url || null,
        position: parseInt(position, 10),
        theme: JSON.stringify(themeObj) as any,
      } as unknown as Link;

      const result = await linkService.insert(newLink);
      updatePageKey("links", [...(page.links ?? []), result]);
      handleClose();
    } finally {
      setIsLoading(false);
    }
  };

  const urlPlaceholder = selectedPlatform
    ? URL_PLACEHOLDERS[selectedPlatform]
    : URL_PLACEHOLDERS.default;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <ModalContent>
        <ModalHeader>
          {step === "type" && "Add Button"}
          {step === "platform" && "Choose Platform"}
          {step === "configure" && "Configure Button"}
        </ModalHeader>
        <ModalBody>
          {step === "type" && (
            <div className="flex flex-col gap-3">
              <LinkTypeCard
                icon={<MdMusicNote />}
                title="Streaming Link"
                description="Link to your music on Spotify, Apple Music, etc."
                isSelected={selectedType === LinkType.stream}
                onClick={() => handleTypeSelect(LinkType.stream)}
              />
              <LinkTypeCard
                icon={<FaLink />}
                title="Standard Link"
                description="Any website, social media, or custom URL."
                isSelected={selectedType === LinkType.default}
                onClick={() => handleTypeSelect(LinkType.default)}
              />
            </div>
          )}

          {step === "platform" && (
            <div className="grid grid-cols-2 gap-3">
              <StreamPlatformCard
                icon={<FaSpotify />}
                name="Spotify"
                color="#1DB954"
                isSelected={selectedPlatform === StreamPlatform.spotify}
                onClick={() => handlePlatformSelect(StreamPlatform.spotify)}
              />
              <StreamPlatformCard
                icon={<SiApplemusic />}
                name="Apple Music"
                color="#fc3c44"
                isSelected={selectedPlatform === StreamPlatform.appleMusic}
                onClick={() => handlePlatformSelect(StreamPlatform.appleMusic)}
              />
            </div>
          )}

          {step === "configure" && (
            <div className="flex flex-col gap-3">
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
                placeholder={urlPlaceholder}
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
          )}
        </ModalBody>
        <ModalFooter>
          {step === "type" && (
            <Button variant="light" onClick={handleClose}>Cancel</Button>
          )}
          {step === "platform" && (
            <Button variant="light" onClick={() => setStep("type")}>Back</Button>
          )}
          {step === "configure" && (
            <>
              <Button variant="light" onClick={() => setStep(selectedType === LinkType.stream ? "platform" : "type")}>Back</Button>
              <Button isLoading={isLoading} onClick={handleSave} color="primary">Save</Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
