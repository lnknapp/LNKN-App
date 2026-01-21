import PhonePreview from "../../../components/PhonePreview/PhonePreview";
import { usePageDetails } from "./PageDetailsContext";
import PageRenderer from "../../public/PageRenderer";

interface LivePhonePreviewProps {
  className?: string;
}

export function LivePhonePreview({ className }: LivePhonePreviewProps) {
  const { page } = usePageDetails();

  return (
    <PhonePreview className={className}>
      <PageRenderer page={page} />
    </PhonePreview>
  );
}

export default LivePhonePreview;

