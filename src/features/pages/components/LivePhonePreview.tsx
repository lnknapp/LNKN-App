import { useEffect, useState } from "react";
import PhonePreview from "../../../components/PhonePreview/PhonePreview";
import { usePageDetails } from "./PageDetailsContext";
import PageRenderer from "../../public/PageRenderer";
import { UserProfileService } from "../../../services/userProfile/UserProfileService";
import { SocialLinks } from "../../../data/repo/userProfile/UserProfileRepo";

interface LivePhonePreviewProps {
  className?: string;
}

const profileService = new UserProfileService();

export function LivePhonePreview({ className }: LivePhonePreviewProps) {
  const { page } = usePageDetails();
  const [socials, setSocials] = useState<SocialLinks>({});

  useEffect(() => {
    profileService.getMe().then((p) => setSocials(profileService.parseSocials(p))).catch(() => {});
  }, []);

  return (
    <PhonePreview className={className}>
      <PageRenderer page={page} socials={socials} />
    </PhonePreview>
  );
}

export default LivePhonePreview;

