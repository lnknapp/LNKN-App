import {
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Chip, Switch,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FaInstagram, FaTiktok, FaSpotify, FaYoutube } from "react-icons/fa";
import { SiApplemusic, SiSoundcloud } from "react-icons/si";
import { Button } from "../../../../components/Button/Button";
import { Link } from "../../../../data/entities/pages/Link";
import { LinkType } from "../../../../data/entities/pages/LinkType";
import { StreamPlatform } from "../../../../data/entities/pages/StreamPlatform";
import { LinkService } from "../../../../services/pages/LinkService";
import { UserProfileService } from "../../../../services/userProfile/UserProfileService";
import { SocialLinks } from "../../../../data/repo/userProfile/UserProfileRepo";
import { usePageDetails } from "../PageDetailsContext";
import { BUTTON_STYLES, BUTTON_STYLE_PREVIEWS, ButtonStyleId } from "../../../../data/entities/pages/ButtonStyle";

interface EditLinkModalProps {
  link: Link | null;
  isOpen: boolean;
  onClose: () => void;
}

const linkService = new LinkService();
const profileService = new UserProfileService();

const PLATFORM_LABELS: Record<string, string> = {
  [StreamPlatform.spotify]: "Spotify",
  [StreamPlatform.appleMusic]: "Apple Music",
};

const SOCIAL_OPTIONS: { key: keyof SocialLinks; label: string; icon: React.ReactNode; color: string; bg: string }[] = [
  { key: "instagram",  label: "Instagram",   icon: <FaInstagram size={18} />,  color: "#E1306C", bg: "#E1306C22" },
  { key: "tikTok",     label: "TikTok",      icon: <FaTiktok size={18} />,     color: "#010101", bg: "#01010115" },
  { key: "spotify",    label: "Spotify",     icon: <FaSpotify size={18} />,    color: "#1DB954", bg: "#1DB95422" },
  { key: "appleMusic", label: "Apple Music", icon: <SiApplemusic size={18} />, color: "#fc3c44", bg: "#fc3c4422" },
  { key: "youtube",    label: "YouTube",     icon: <FaYoutube size={18} />,    color: "#FF0000", bg: "#FF000022" },
  { key: "soundCloud", label: "SoundCloud",  icon: <SiSoundcloud size={18} />, color: "#FF5500", bg: "#FF550022" },
];

export const EditLinkModal: React.FC<EditLinkModalProps> = ({ link, isOpen, onClose }) => {
  const { page, updatePageKey } = usePageDetails();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [iconMono, setIconMono] = useState(false);
  const [buttonStyle, setButtonStyle] = useState<ButtonStyleId>('solid');
  const [buttonTransparent, setButtonTransparent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userSocials, setUserSocials] = useState<SocialLinks>({});
  const [enabledSocials, setEnabledSocials] = useState<string[]>([]);

  const isSocials = link?.type === LinkType.socials;

  useEffect(() => {
    if (link) {
      setTitle(link.title);
      setUrl(link.url ?? "");

      const parsed = typeof link.theme === "string" ? JSON.parse(link.theme) : (link.theme as any ?? {});
      if (link.type === LinkType.socials) {
        setEnabledSocials(parsed.enabledSocials ?? []);
        setIconMono(parsed.iconMono ?? false);
      } else {
        setButtonStyle((parsed.buttonStyle as ButtonStyleId) ?? 'solid');
        setButtonTransparent(parsed.buttonTransparent ?? false);
      }
    }
  }, [link]);

  useEffect(() => {
    if (isOpen && isSocials) {
      profileService.getMe().then((p) => setUserSocials(profileService.parseSocials(p))).catch(() => {});
    }
  }, [isOpen, isSocials]);

  const parsedTheme = link?.theme
    ? (typeof link.theme === "string" ? JSON.parse(link.theme) : link.theme as any)
    : {};
  const platformLabel = link?.type === LinkType.stream
    ? PLATFORM_LABELS[parsedTheme?.platform] ?? null
    : null;

  const toggleSocial = (key: string, on: boolean) => {
    setEnabledSocials((prev) => on ? [...prev, key] : prev.filter((k) => k !== key));
  };

  const handleSave = async () => {
    if (!link) return;
    setIsLoading(true);
    try {
      let themeStr: string;
      if (isSocials) {
        themeStr = JSON.stringify({ enabledSocials, iconMono });
      } else {
        const existingTheme = typeof link.theme === "string" ? JSON.parse(link.theme) : (link.theme ?? {});
        themeStr = JSON.stringify({ ...existingTheme, buttonStyle, buttonTransparent });
      }
      const updated = { ...link, title, url: url || null, theme: themeStr as any };
      const result = await linkService.update(link.id, updated);
      updatePageKey("links", (page.links ?? []).map((l) => l.id === link.id ? result : l));
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalContent>
        <ModalHeader>{isSocials ? "Edit Social Row" : "Edit Button"}</ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-3">
            {platformLabel && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-default-500">Platform:</span>
                <Chip size="sm" variant="flat">{platformLabel}</Chip>
              </div>
            )}

            {isSocials ? (
              <>
                <div className="space-y-2">
                  <p className="text-xs text-default-500 uppercase tracking-wider">Icon Style</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setIconMono(false)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${!iconMono ? 'border-primary bg-primary-50' : 'border-default-200 hover:border-default-400'}`}
                    >
                      <div className="flex items-center gap-2">
                        <FaInstagram size={20} color="#E1306C" />
                        <FaSpotify size={20} color="#1DB954" />
                        <FaTiktok size={20} color="#010101" />
                      </div>
                      <span className="text-xs font-semibold text-default-600 tracking-wide">Color</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIconMono(true)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${iconMono ? 'border-primary bg-primary-50' : 'border-default-200 hover:border-default-400'}`}
                    >
                      <div className="flex items-center gap-2">
                        <FaInstagram size={20} color="#444444" />
                        <FaSpotify size={20} color="#444444" />
                        <FaTiktok size={20} color="#444444" />
                      </div>
                      <span className="text-xs font-semibold text-default-600 tracking-wide">Mono</span>
                    </button>
                  </div>
                </div>
                {SOCIAL_OPTIONS.map(({ key, label, icon, color, bg }) => {
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
                })}
              </>
            ) : (
              <>
                <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} variant="bordered" />
                <Input label="URL" value={url} onChange={(e) => setUrl(e.target.value)} variant="bordered" />
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
              </>
            )}

          </div>
        </ModalBody>
        {isSocials && SOCIAL_OPTIONS.some(({ key }) => !userSocials[key]) && (
          <div className="px-6 pb-2">
            <p className="text-sm text-default-400">
              Some platforms aren't configured yet. Add your social links in{" "}
              <a href="/settings/profile" className="text-primary underline">Profile Settings</a>.
            </p>
          </div>
        )}
        <ModalFooter>
          <Button variant="light" onClick={onClose}>Cancel</Button>
          <Button isLoading={isLoading} onClick={handleSave} color="primary">Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
