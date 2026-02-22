import { FaSpotify, FaLink } from "react-icons/fa";
import { SiApplemusic } from "react-icons/si";
import { LinkType } from "../../data/entities/pages/LinkType";
import { StreamPlatform } from "../../data/entities/pages/StreamPlatform";
import { ImageService } from "../../services/image/ImageService";
import { SocialsRow } from "./SocialsRow";
import { SocialLinks } from "../../data/repo/userProfile/UserProfileRepo";

const imageService = new ImageService();

interface PageRendererProps {
  page: any;
  socials?: SocialLinks;
}

const getLinkStyle = (link: any): React.CSSProperties => {
  if (link.type === LinkType.stream) {
    const platform = link.theme?.platform;
    if (platform === StreamPlatform.spotify) return { backgroundColor: "#1DB954" };
    if (platform === StreamPlatform.appleMusic) return { backgroundColor: "#fc3c44" };
  }
  return { backgroundColor: "#022213" };
};

const getLinkIcon = (link: any) => {
  if (link.type === LinkType.stream) {
    const platform = link.theme?.platform;
    if (platform === StreamPlatform.spotify) return <FaSpotify size={18} />;
    if (platform === StreamPlatform.appleMusic) return <SiApplemusic size={18} />;
  }
  return <FaLink size={16} />;
};

const PageRenderer = ({ page, socials }: PageRendererProps) => {
  const theme = page.theme ? JSON.parse(page.theme) : {};
  const backgroundColor = theme.backgroundColor || '#ffffff';
  const fontFamily = theme.fontFamily || 'Arial, sans-serif';

  const links = [...(page.links ?? [])].sort((a: any, b: any) => a.position - b.position);

  const buttonRadius = theme.buttonShape === 'sharp' ? '0' : theme.buttonShape === 'square' ? '0.5rem' : '9999px';

  return (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor, fontFamily, minHeight: '100vh' }}>
      <div className="flex flex-col items-center pt-8 pb-4 px-4 gap-3">
        <div className="text-xl font-bold">{page?.name}</div>
        {page?.imageId && (
          <div className={`w-56 h-56 overflow-hidden shrink-0 bg-black/10 ${theme.imageShape === 'round' ? 'rounded-full' : theme.imageShape === 'sharp' ? 'rounded-none' : 'rounded-xl'}`}>
            <img
              src={imageService.getRenderUrl(page.imageId)}
              alt={page.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {socials && <SocialsRow socials={socials} />}

      {links.length > 0 && (
        <div className="flex flex-col gap-3 px-4">
          {links.map((link: any) => {
            const linkTheme = typeof link.theme === "string"
              ? JSON.parse(link.theme)
              : (link.theme ?? {});
            const enrichedLink = { ...link, theme: linkTheme };

            return (
              <a
                key={link.id}
                href={link.url ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...getLinkStyle(enrichedLink),
                  fontFamily,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  color: "#ffffff",
                  borderRadius: buttonRadius,
                  padding: "0.75rem 1rem",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                }}
              >
                {getLinkIcon(enrichedLink)}
                {link.title}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PageRenderer;
