import { FaSpotify, FaLink } from "react-icons/fa";
import { SiApplemusic } from "react-icons/si";
import { LinkType } from "../../data/entities/pages/LinkType";
import { StreamPlatform } from "../../data/entities/pages/StreamPlatform";
import { ImageService } from "../../services/image/ImageService";
import { SocialsRow } from "./SocialsRow";
import { SocialLinks } from "../../data/repo/userProfile/UserProfileRepo";
import { ButtonStyleId } from "../../data/entities/pages/ButtonStyle";

const imageService = new ImageService();

const SOCIAL_CANONICAL_ORDER = ['instagram', 'tikTok', 'spotify', 'appleMusic', 'youtube', 'soundCloud'];

interface PageRendererProps {
  page: any;
  socials?: SocialLinks;
}

const getSolidBackground = (link: any): string => {
  if (link.type === LinkType.stream) {
    const platform = link.theme?.platform;
    if (platform === StreamPlatform.spotify) return "#1DB954";
    if (platform === StreamPlatform.appleMusic) return "#fc3c44";
  }
  return "#022213";
};

const getLinkIcon = (link: any, color: string, size: number) => {
  if (link.type === LinkType.stream) {
    const platform = link.theme?.platform;
    if (platform === StreamPlatform.spotify) return <FaSpotify size={size} color={color} />;
    if (platform === StreamPlatform.appleMusic) return <SiApplemusic size={size} color={color} />;
  }
  return <FaLink size={size - 2} color={color} />;
};

const getButtonAppearance = (
  link: any,
  buttonStyle: ButtonStyleId,
  buttonRadius: string,
  buttonTransparent: boolean,
) => {
  // icon-left styles share Kupeo-inspired proportions
  const kupeoProps = {
    iconLeft: true,
    iconSize: 24,
    padding: '0.25rem 0.75rem',
    fontSize: '1.2rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
  };

  switch (buttonStyle) {
    case 'minimal':
      return {
        containerStyle: {
          backgroundColor: buttonTransparent ? 'transparent' : '#ffffff',
          color: '#000000',
          border: '2px solid #000000',
          boxShadow: '0.3rem 0.3rem 0 #000000',
          borderRadius: buttonRadius,
        },
        iconColor: '#000000',
        ...kupeoProps,
      };
    case 'dark':
      return {
        containerStyle: {
          backgroundColor: buttonTransparent ? 'transparent' : '#111111',
          color: buttonTransparent ? '#111111' : '#ffffff',
          borderRadius: buttonRadius,
        },
        iconColor: buttonTransparent ? '#111111' : '#ffffff',
        ...kupeoProps,
      };
    case 'outline':
      return {
        containerStyle: {
          backgroundColor: 'transparent',
          color: '#111111',
          border: '2px solid #111111',
          borderRadius: buttonRadius,
        },
        iconColor: '#111111',
        ...kupeoProps,
      };
    case 'soft':
      return {
        containerStyle: {
          backgroundColor: buttonTransparent ? 'transparent' : 'rgba(0,0,0,0.06)',
          color: '#111111',
          border: '1px solid rgba(0,0,0,0.15)',
          borderRadius: buttonRadius,
        },
        iconColor: '#333333',
        ...kupeoProps,
      };
    default: // 'solid'
      return {
        containerStyle: {
          backgroundColor: buttonTransparent ? 'transparent' : getSolidBackground(link),
          color: buttonTransparent ? '#111111' : '#ffffff',
          borderRadius: buttonRadius,
        },
        iconColor: buttonTransparent ? '#111111' : '#ffffff',
        iconLeft: false,
        iconSize: 18,
        padding: '0.75rem 1rem',
        fontSize: '0.95rem',
        fontWeight: 600,
        letterSpacing: 'normal',
      };
  }
};

const PageRenderer = ({ page, socials }: PageRendererProps) => {
  const theme = page.theme ? JSON.parse(page.theme) : {};
  const backgroundColor = theme.backgroundColor || '#ffffff';
  const fontFamily = theme.fontFamily || 'Arial, sans-serif';

  const links = [...(page.links ?? [])].sort((a: any, b: any) => a.position - b.position);

  const buttonRadius = theme.buttonShape === 'sharp' ? '0' : theme.buttonShape === 'square' ? '0.5rem' : '9999px';

  return (
    <div style={{ backgroundColor, fontFamily, minHeight: '100vh' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="flex flex-col items-center pt-10 pb-6 px-4 gap-4">
        <div className="text-xl font-bold">{page?.name}</div>
        {page?.imageId && (
          <div className={`w-56 h-56 overflow-hidden shrink-0 bg-black/10 my-2 ${theme.imageShape === 'round' ? 'rounded-full' : theme.imageShape === 'sharp' ? 'rounded-none' : 'rounded-xl'}`}>
            <img
              src={imageService.getRenderUrl(page.imageId)}
              alt={page.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {links.length > 0 && (
        <div className="flex flex-col gap-3 px-4">
          {links.map((link: any) => {
            const linkTheme = typeof link.theme === "string"
              ? JSON.parse(link.theme)
              : (link.theme ?? {});
            const enrichedLink = { ...link, theme: linkTheme };

            if (link.type === "Socials") {
              const enabledSet = new Set<string>(linkTheme.enabledSocials ?? []);
              const ordered = SOCIAL_CANONICAL_ORDER.reduce((acc, key) => {
                if (enabledSet.has(key)) {
                  const val = socials ? (socials as any)[key] : undefined;
                  if (val) acc[key] = val;
                }
                return acc;
              }, {} as Record<string, string>);
              return <SocialsRow key={link.id} socials={ordered} mono={linkTheme.iconMono ?? false} />;
            }

            const buttonStyle: ButtonStyleId = linkTheme.buttonStyle ?? 'solid';
            const buttonTransparent: boolean = linkTheme.buttonTransparent ?? false;
            const { containerStyle, iconColor, iconLeft, iconSize, padding, fontSize, fontWeight, letterSpacing } =
              getButtonAppearance(enrichedLink, buttonStyle, buttonRadius, buttonTransparent);

            return (
              <a
                key={link.id}
                href={link.url ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily,
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  fontWeight,
                  fontSize,
                  letterSpacing,
                  padding,
                  ...(iconLeft ? {} : { justifyContent: "center", gap: "0.5rem" }),
                  ...containerStyle,
                }}
              >
                {iconLeft ? (
                  <>
                    <span style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
                      {getLinkIcon(enrichedLink, iconColor, iconSize)}
                    </span>
                    <span style={{ flexGrow: 1, textAlign: "center", marginRight: `${iconSize}px` }}>
                      {link.title}
                    </span>
                  </>
                ) : (
                  <>
                    {getLinkIcon(enrichedLink, iconColor, iconSize)}
                    {link.title}
                  </>
                )}
              </a>
            );
          })}
        </div>
      )}
      </div>
    </div>
  );
};

export default PageRenderer;
