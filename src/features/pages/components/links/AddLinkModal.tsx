import {
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Switch,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FaSpotify, FaLink, FaInstagram, FaTiktok, FaYoutube, FaGripVertical } from "react-icons/fa";
import { SiApplemusic, SiSoundcloud } from "react-icons/si";
import { MdMusicNote } from "react-icons/md";
import { HiShare } from "react-icons/hi";
import { Button } from "../../../../components/Button/Button";
import { Link } from "../../../../data/entities/pages/Link";
import { LinkType } from "../../../../data/entities/pages/LinkType";
import { StreamPlatform } from "../../../../data/entities/pages/StreamPlatform";
import { LinkService } from "../../../../services/pages/LinkService";
import { UserProfileService } from "../../../../services/userProfile/UserProfileService";
import { SocialLinks } from "../../../../data/repo/userProfile/UserProfileRepo";
import { usePageDetails } from "../PageDetailsContext";
import { BUTTON_STYLES, BUTTON_STYLE_PREVIEWS, ButtonStyleId } from "../../../../data/entities/pages/ButtonStyle";
import { LinkTypeCard } from "./LinkTypeCard";
import { StreamPlatformCard } from "./StreamPlatformCard";

interface AddLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "type" | "platform" | "configure" | "socials";

const linkService = new LinkService();
const profileService = new UserProfileService();

const DEFAULT_TITLES: Record<string, string> = {
  [StreamPlatform.spotify]: "Listen on Spotify",
  [StreamPlatform.appleMusic]: "Listen on Apple Music",
};

const URL_PLACEHOLDERS: Record<string, string> = {
  [StreamPlatform.spotify]: "https://open.spotify.com/...",
  [StreamPlatform.appleMusic]: "https://music.apple.com/...",
  default: "https://",
};

const SOCIAL_OPTIONS: { key: keyof SocialLinks; label: string; icon: React.ReactNode; color: string; bg: string }[] = [
  { key: "instagram",  label: "Instagram",   icon: <FaInstagram size={18} />,  color: "#E1306C", bg: "#E1306C22" },
  { key: "tikTok",     label: "TikTok",      icon: <FaTiktok size={18} />,     color: "#010101", bg: "#01010115" },
  { key: "spotify",    label: "Spotify",     icon: <FaSpotify size={18} />,    color: "#1DB954", bg: "#1DB95422" },
  { key: "appleMusic", label: "Apple Music", icon: <SiApplemusic size={18} />, color: "#fc3c44", bg: "#fc3c4422" },
  { key: "youtube",    label: "YouTube",     icon: <FaYoutube size={18} />,    color: "#FF0000", bg: "#FF000022" },
  { key: "soundCloud", label: "SoundCloud",  icon: <SiSoundcloud size={18} />, color: "#FF5500", bg: "#FF550022" },
];

export const AddLinkModal: React.FC<AddLinkModalProps> = ({ isOpen, onClose }) => {
  const { page, updatePageKey } = usePageDetails();
  const [step, setStep] = useState<Step>("type");
  const [selectedType, setSelectedType] = useState<LinkType>(LinkType.default);
  const [selectedPlatform, setSelectedPlatform] = useState<StreamPlatform | null>(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [buttonStyle, setButtonStyle] = useState<ButtonStyleId>('solid');
  const [buttonTransparent, setButtonTransparent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userSocials, setUserSocials] = useState<SocialLinks>({});
  const [enabledSocials, setEnabledSocials] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      profileService.getMe().then((p) => setUserSocials(profileService.parseSocials(p))).catch(() => {});
    }
  }, [isOpen]);

  const resetState = () => {
    setStep("type");
    setSelectedType(LinkType.default);
    setSelectedPlatform(null);
    setTitle("");
    setUrl("");
    setButtonStyle('solid');
    setButtonTransparent(false);
    setEnabledSocials([]);
  };

  const handleClose = () => { resetState(); onClose(); };

  const handleTypeSelect = (type: LinkType) => {
    setSelectedType(type);
    if (type === LinkType.stream) {
      setStep("platform");
    } else if (type === LinkType.socials) {
      setStep("socials");
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

  const toggleSocial = (key: string, on: boolean) => {
    setEnabledSocials((prev) => on ? [...prev, key] : prev.filter((k) => k !== key));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      let themeObj: Record<string, any> = {};
      let finalTitle = title;
      let finalUrl: string | null = url || null;

      if (selectedType === LinkType.stream && selectedPlatform) {
        themeObj = { platform: selectedPlatform, buttonStyle, buttonTransparent };
      } else if (selectedType === LinkType.socials) {
        themeObj = { enabledSocials };
        finalTitle = "Social Row";
        finalUrl = null;
      } else {
        themeObj = { buttonStyle, buttonTransparent };
      }

      const newLink = {
        pageId: page.id,
        type: selectedType,
        title: finalTitle,
        url: finalUrl,
        position: (page.links?.length ?? 0) + 1,
        theme: JSON.stringify(themeObj) as any,
      } as unknown as Link;

      const result = await linkService.insert(newLink);
      updatePageKey("links", [...(page.links ?? []), result]);
      handleClose();
    } finally {
      setIsLoading(false);
    }
  };

  const urlPlaceholder = selectedPlatform ? URL_PLACEHOLDERS[selectedPlatform] : URL_PLACEHOLDERS.default;
  const hasAnySocials = SOCIAL_OPTIONS.some(({ key }) => userSocials[key]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <ModalContent>
        <ModalHeader>
          {step === "type" && "Add Button"}
          {step === "platform" && "Choose Platform"}
          {step === "configure" && "Configure Button"}
          {step === "socials" && "Social Row"}
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
              <LinkTypeCard
                icon={<HiShare />}
                title="Social Row"
                description="A row of your social media icons."
                isSelected={selectedType === LinkType.socials}
                onClick={() => handleTypeSelect(LinkType.socials)}
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
              <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} variant="bordered" />
              <Input label="URL" value={url} onChange={(e) => setUrl(e.target.value)} placeholder={urlPlaceholder} variant="bordered" />
              <div className="space-y-2">
                <p className="text-xs text-default-500 uppercase tracking-wider">Button Style</p>
                <div className="flex gap-2">
                  {BUTTON_STYLES.map(({ id, label }) => {
                    const selected = buttonStyle === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setButtonStyle(id)}
                        className={`flex-1 flex flex-col items-center gap-1.5 p-2 rounded-xl border-2 transition-all ${
                          selected ? 'border-primary bg-primary-50' : 'border-default-200'
                        }`}
                      >
                        <div style={{ ...BUTTON_STYLE_PREVIEWS[id], borderRadius: 6, padding: '3px 0', fontSize: 11, fontWeight: 700, width: '100%', textAlign: 'center' }}>
                          Aa
                        </div>
                        <span className="text-xs text-default-500">{label}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-default-500">Transparent background</span>
                  <Switch size="sm" isSelected={buttonTransparent} onValueChange={setButtonTransparent} />
                </div>
              </div>
            </div>
          )}

          {step === "socials" && (
            <div className="flex flex-col gap-3">
              {!hasAnySocials ? (
                <p className="text-sm text-default-400">
                  No social links configured yet. Add them in{" "}
                  <a href="/settings/profile" className="text-primary underline">Profile Settings</a>.
                </p>
              ) : (
                SOCIAL_OPTIONS.map(({ key, label, icon, color, bg }) => {
                  const hasUrl = !!userSocials[key];
                  const isOn = enabledSocials.includes(key);
                  return (
                    <div
                      key={key}
                      className={`flex items-center gap-3 p-3 rounded-xl border ${isOn && hasUrl ? "border-primary/40 bg-primary-50/30" : "border-default-200"}`}
                    >
                      <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: hasUrl ? bg : "#f4f4f540" }}>
                        <span style={{ color: hasUrl ? color : "#aaa" }}>{icon}</span>
                      </div>
                      <span className={`flex-1 text-sm font-medium ${!hasUrl ? "text-default-300" : ""}`}>
                        {label}
                        {!hasUrl && <span className="ml-2 text-xs font-normal text-default-300">(not configured)</span>}
                      </span>
                      <Switch isSelected={isOn && hasUrl} isDisabled={!hasUrl} onValueChange={(v) => toggleSocial(key, v)} size="sm" />
                    </div>
                  );
                })
              )}
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          {step === "type" && <Button variant="light" onClick={handleClose}>Cancel</Button>}
          {step === "platform" && <Button variant="light" onClick={() => setStep("type")}>Back</Button>}
          {(step === "configure" || step === "socials") && (
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
