import { Link } from "./Link";
import { PageTag } from "./PageTag";
import { PageType } from "./PageType";

export interface Page {
  id: number;
  userId: string;  // Supabase UUID
  type: PageType;
  slug?: string | null;
  pixelId?: string | null;
  name: string;
  isPublished: boolean;
  theme: string;
  description?: string | null;
  imageId?: number | null;
  links: Link[];
  pageTags: PageTag[];
}
