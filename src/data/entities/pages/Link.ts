import { LinkType } from "./LinkType";
import { Page } from "./Page";

export interface Link {
  id: number;
  pageId: number;
  type: LinkType;
  title: string;
  url?: string | null;
  position: number;
  theme: JSON;
  page: Page;
}
